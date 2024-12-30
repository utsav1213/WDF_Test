let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

document.addEventListener("DOMContentLoaded", function () {
    renderTasks();
});

function renderTasks() {
    const columns = ['todo', 'in-progress', 'done'];

    columns.forEach(columnId => {
        const column = document.querySelector(`#${columnId} .task-list`);
        column.innerHTML = '';

        tasks.forEach(task => {
            if (task.status === columnId) {
                const taskElement = createTaskElement(task.content, task.id);
                column.appendChild(taskElement);
            }
        });
    });
}

function createTaskElement(content, id) {
    const task = document.createElement('div');
    task.id = id;
    task.className = 'task-item';
    task.draggable = true;

    const taskContent = document.createElement('span');
    taskContent.textContent = content;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(id);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(id);

    task.appendChild(taskContent);
    task.appendChild(editBtn);
    task.appendChild(deleteBtn);

    task.addEventListener('dragstart', drag);
    return task;
}

function addTask(columnId) {
    const taskInput = document.querySelector(`#${columnId} .task-input`);
    const taskContent = taskInput.value.trim();

    if (taskContent) {
        const newTask = {
            id: 'task-' + Date.now(),
            content: taskContent,
            status: columnId
        };
        tasks.push(newTask);
        updateLocalStorage();
        renderTasks();
        taskInput.value = '';
    } else {
        alert('Task cannot be empty.');
    }
}

function editTask(taskId) {
    const taskToEdit = tasks.find(task => task.id === taskId);
    const newContent = prompt('Edit your task:', taskToEdit.content);
    if (newContent) {
        taskToEdit.content = newContent.trim();
        updateLocalStorage();
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    updateLocalStorage();
    renderTasks();
}

function drag(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, columnId) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const draggedTask = document.getElementById(taskId);

    if (draggedTask) {
        updateTaskStatus(taskId, columnId);
        const taskList = document.querySelector(`#${columnId} .task-list`);
        taskList.appendChild(draggedTask);
    }
}

function updateTaskStatus(taskId, newStatus) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, status: newStatus };
        }
        return task;
    });
    updateLocalStorage();
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
