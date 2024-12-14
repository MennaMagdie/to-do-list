const selectedForm = document.forms.taskForm;
const taskListContainer = document.querySelector("#taskListContainer");

const tasks = JSON.parse(localStorage.getItem("tasks"));
let taskList = tasks || []; //all task values read from DOM

selectedForm.addEventListener("submit", (e) => {
    e.preventDefault();
    newTaskHandler();
});

updateDOM();

function newTaskHandler() {
    const taskContent = selectedForm["name-task"].value;
    taskList.push(taskContent);
    update();

    selectedForm["name-task"].value = ""; 
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

    taskList.forEach((task, index) => {
        const newElement = document.createElement("div");

        if (index === taskList.length - 1) {
            newElement.classList.add("animate");
        }

        renderTask(newElement, task);

        if (index === taskList.length - 1) {
            setTimeout(() => {
                newElement.classList.remove("animate");
            }, 250); 
        }
    });

}

function renderTask(newElement, task) {

    // const newElement = document.createElement("div");
    // newElement.className = "task-item-container";
    // newElement.classList.add("animate");
    newElement.classList.add("task-item-container");

    const taskText = document.createElement("p");
    taskText.innerText = task;
    taskText.className = "task-item";
    newElement.append(taskText);

    // 1. Update
    const updateButton = document.createElement("button");
    updateButton.innerText = "Update";
    updateButton.className = "update-task";
    
    updateButton.addEventListener("click", () => {
        updateTask(newElement, task);
    });
    newElement.append(updateButton);

    // 2. Delete
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Done";
    deleteButton.className = "delete-task";
    deleteButton.addEventListener("click", () => {
        deleteTask(task);
    });
    newElement.append(deleteButton);

    taskListContainer.prepend(newElement);
}

function deleteTask(task) {
    taskList = taskList.filter((x) => x !== task);
    update();
}

function updateTask(newElement, task) {

    const container = document.createElement("div");
    container.className = "update-container";

    const newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("placeholder", "Enter Updated Task");
    // newInput.setAttribute("required", true);
    newInput.className = "update-value";
    newInput.value = task; //prefill
    container.appendChild(newInput);

    const updatedButton = document.createElement("button");
    updatedButton.innerText = "Save";
    updatedButton.className = "save-task";
    container.appendChild(updatedButton);

    newElement.after(container);

    updatedButton.addEventListener("click", () => {
        
        const updatedValue = newInput.value;
        updateTaskList(task, updatedValue);

        update();
        container.remove();
        }
    );

}

function updateTaskList(oldTask, updatedValue) {

    if (updatedValue !== "") {
        
        const index = taskList.findIndex((task)=> task === oldTask);
        if(index !== -1) {
            taskList[index] = updatedValue
        }
    
}

}
