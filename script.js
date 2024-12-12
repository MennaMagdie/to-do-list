
const taskListContainer = document.querySelector("#taskListContainer");
const selectedForm = document.forms.taskForm;


const tasksFromLocalStorage = localStorage.getItem("tasks");

const tasks = JSON.parse(tasksFromLocalStorage);

let taskList = tasks || [];

//  initial step

// update DOM with the current list

function updateTaskList() {
  taskListContainer.innerHTML = "";

  taskList.forEach((task) => {
    renderTaskItem(task);
  });
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function update() {
  updateTaskList(); // render the updated task list
  updateLocalStorage(); // save updated task list to the DOM
}

updateTaskList();


function deleteTaskItem(task) {
  taskList = taskList.filter((x) => x !== task);

  update();
}

function renderTaskItem(task) {

  const newTaskElement = document.createElement("p");
  newTaskElement.innerText = task;
  newTaskElement.className = "task-item";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", () => {
    deleteTaskItem(task);
  });

  newTaskElement.append(deleteBtn);

  taskListContainer.prepend(newTaskElement);
}

function newTaskHandler() {
  const selectedInput = selectedForm["name-task"];
  const taskValue = selectedInput.value;
  taskList.push(taskValue);

  update();
  selectedInput.value = "";
}

selectedForm.addEventListener("submit", (e) => {
  e.preventDefault();
  newTaskHandler();
});

window.addEventListener("offline", (e) => {
  console.log("offline");
  const barItem = document.querySelector(".status-bar");
  barItem.classList.add("offline");
});

window.addEventListener("online", (e) => {
  const barItem = document.querySelector(".status-bar");
  barItem.classList.add("online");
  barItem.classList.remove("offline");
});


const worker = new Worker("worker.js");

worker.postMessage({ type: "calculate", data: 1000 });

worker.onmessage = function (e) {
  console.log("Result from worker:", e.data);
};
