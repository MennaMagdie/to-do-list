const selectedForm = document.forms.taskForm;
const taskListContainer = document.querySelector("#taskListContainer");

const tasks = JSON.parse(localStorage.getItem("tasks"));
let taskList = tasks || []; //stores all task values read from DOM


selectedForm.addEventListener("submit", (e) => {
    e.preventDefault(); //tried removing
    newTaskHandler();
});

updateDOM(); //why standalone?

function newTaskHandler() {
    const taskContent = selectedForm["name-task"].value; //value di eh eldtype bta3etha?
    taskList.push(taskContent);
    update();

    selectedForm["name-task"].value = ""; //tried removing
}

function update() {
    updateDOM();
    updateLocalStorage();
}

function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function updateDOM() {
    taskListContainer.innerHTML = "";

    taskList.forEach((task) => {
        renderTask(task);
    });
}

function renderTask(task) {
    const newElement = document.createElement("p");
    newElement.innerText = task;
    newElement.className = "task-item";


    const updateButton = document.createElement("button");
    updateButton.innerText = "Update";
    updateButton.className = "update-task";
    updateButton.addEventListener("click", (e) => {
        updateTaskValue(task);
    });
    newElement.append(updateButton);


    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete-task";
    newElement.append(deleteButton);
    deleteButton.addEventListener("click", (e) => {
        deleteTask(task);
    });

    taskListContainer.prepend(newElement);
    
}

function deleteTask(task) {
    taskList = taskList.filter((x) => x !== task);
    update();
}

function updateTaskValue(task) {
    taskList = taskList.filter((x) => x !== task);
    newTaskHandler();
}
