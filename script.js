const compliments = [
  "Great job! 🌟",
  "You're amazing! 💖",
  "Keep going! 🚀",
  "Nice work! 😍"
];

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = localStorage.getItem("darkMode");

if (darkMode === "enabled") {
  document.body.classList.add("dark");
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const row = document.createElement("div");
    row.className = "row";

    const left = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    const span = document.createElement("span");
    span.textContent = task.text + (task.time ? " ⏰ " + task.time : "");

    if (task.done) span.classList.add("completed");

    checkbox.onclick = () => {
      task.done = !task.done;
      showCompliment();
      saveTasks();
      renderTasks();
    };

    left.appendChild(checkbox);
    left.appendChild(span);

    const right = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => editTask(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    right.appendChild(editBtn);
    right.appendChild(delBtn);

    row.appendChild(left);
    row.appendChild(right);

    li.appendChild(row);
    list.appendChild(li);

    if (task.time) checkReminder(task);
  });
}

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const time = document.getElementById("taskTime").value;

  if (!text) return;

  tasks.push({ text, time, done: false });
  saveTasks();
  renderTasks();

  document.getElementById("taskInput").value = "";
}

document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

function editTask(i) {
  const newText = prompt("Edit task:", tasks[i].text);
  if (newText) {
    tasks[i].text = newText;
    saveTasks();
    renderTasks();
  }
}

function showCompliment() {
  document.getElementById("compliment").textContent =
    compliments[Math.floor(Math.random() * compliments.length)];
}

function toggleDark() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
}

function checkReminder(task) {
  const now = new Date().getTime();
  const taskTime = new Date(task.time).getTime();

  if (taskTime > now) {
    setTimeout(() => {
      alert("Reminder: " + task.text);
    }, taskTime - now);
  }
}

/* 🔥 ADD THIS */
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
}

renderTasks();
