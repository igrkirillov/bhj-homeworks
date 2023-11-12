class Task {
    constructor(title) {
        this.title = title;
    }
}

const taskListElement = document.getElementById("tasks__list");
const nameElement = document.getElementById("task__input");
const form = document.forms["tasks__form"];
const tasks = loadTasksFromStorage();

tasks.forEach(task => {
    addTaskToTaskList(task.title);
});

form.addEventListener("submit", event => {
    event.preventDefault();
    addTask(nameElement.value)
    form.reset();
    nameElement.focus();
});

function addTask(title) {
    addTaskToTaskList(title);
    tasks.push(new Task(title));
    saveTasksToStorage(tasks);
}

function addTaskToTaskList(title) {
    const newTaskElement = createTaskElement(title);
    taskListElement.appendChild(newTaskElement);
}
function createTaskElement(text) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    const titleElement = document.createElement("div");
    titleElement.classList.add("task__title");
    titleElement.textContent = text;
    const removeElement = document.createElement("a");
    removeElement.classList.add("task__remove");
    removeElement.href = "#";
    removeElement.textContent = "x";
    removeElement.addEventListener("click", () => removeTask.call(taskElement));
    taskElement.appendChild(titleElement);
    taskElement.appendChild(removeElement);
    return taskElement;
}

function removeTask() {
    const title = this.firstChild.textContent;
    removeTaskFromTaskList(title)
    const removeIndex = tasks.findIndex(el => el.title === title);
    if (removeIndex >= 0) {
        tasks.splice(removeIndex, 1);
        saveTasksToStorage(tasks);
    }
}

function removeTaskFromTaskList(title) {
    const taskElement = Array.from(document.querySelectorAll(".task")).filter(e => e.firstChild.textContent === title)[0];
    taskElement.remove();
}

function loadTasksFromStorage() {
    return JSON.parse(window.localStorage.getItem("tasks")) || [];
}

function saveTasksToStorage(tasks) {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}