const loginForm = document.getElementById('loginForm'); //refres to lgoin
const loginPage = document.getElementById('loginPage');
const todoPage = document.getElementById('todoPage');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskButton = document.getElementById('addTaskButton');
const clearAllButton = document.getElementById('clearAllButton');
const noTasks = document.getElementById('noTasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];//string to aray


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
    noTasks.classList.remove('hidden');
    } else {
        noTasks.classList.add('hidden');
        tasks.forEach((task, index) => {
          let taskElement = document.createElement('li');
            taskElement.className = 'task';
            taskElement.innerHTML = `
                <span>${task.text} <span class="timestamp">(${task.timestamp})</span></span>
                <button onclick="removeTask(${index})">Remove</button>
            `;
            taskList.appendChild(taskElement);
        });
    }
}

addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        let task = {
         text: taskText,
         timestamp: new Date().toLocaleString()
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
});

clearAllButton.addEventListener('click', () => {
tasks = [];
    saveTasks();
    renderTasks();
});

window.removeTask = function (index) {
    tasks.splice(index, 1);
saveTasks();
    renderTasks();
};

loginForm.addEventListener('submit', (e) => {
e.preventDefault();
    const username = document.getElementById('username').value.trim();
    if (username.length >= 3) {
        loginPage.classList.add('hidden');
    todoPage.classList.remove('hidden');
        renderTasks();
    } else {
        alert('Username must be at least 3 characters long!');
    }
});
