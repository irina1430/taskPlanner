const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("task-list");
const deleteBtn = document.getElementById("deleteBtn");

document.addEventListener("DOMContentLoaded", loadTasks);
document.addEventListener("DOMContentLoaded", updateUI);
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    saveTask(taskText);
    taskInput.value = "";
    hideText();
    updateUI();
  }
});

function addTask(taskText) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.innerHTML = `${taskText}`;
  taskList.appendChild(li);
}

function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTask(task));
  hideText();
}

function hideText() {
  const noTask = document.getElementById("noTask");
  if (taskList.children.length > 0) {
    noTask.classList.add("hidden");
  }
}

taskList.addEventListener(
  "click",
  function (event) {
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("checked");
    }
  },
  false
);

deleteBtn.addEventListener("click", clearTaskList);
function clearTaskList() {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
  updateUI();
}

function updateUI() {
  console.log("Проверка списка задач..."); // Проверяем, вызывается ли функция

  if (taskList.children.length > 0) {
    deleteBtn.disabled = false;
    console.log("Кнопка должна быть активной");
  } else {
    deleteBtn.disabled = true;
    console.log("Кнопка должна быть НЕактивной");
  }
}

// Обновляем UI при загрузке страницы
