const taskList = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const dueDateInput = document.getElementById('due-date');
const filterDateInput = document.getElementById('filter-date');
const filterBtn = document.getElementById('filter-btn');

let tasks = [];

// Adicionar tarefas
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const description = descriptionInput.value;
    const dueDate = dueDateInput.value;
    const task = { title, description, dueDate, completed: false };
    tasks.push(task);
    saveTasks();
    renderTaskList();
    titleInput.value = '';
    descriptionInput.value = '';
    dueDateInput.value = '';
});

// Filtrar tarefas
filterBtn.addEventListener('click', () => {
    const filterDate = filterDateInput.value;
    const filteredTasks = tasks.filter((task) => task.dueDate === filterDate);
    renderTaskList(filteredTasks);
});

// Salvar tarefas
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Carregar tarefas
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTaskList();
    }
}

// Renderizar lista de tarefas
function renderTaskList(tasksToRender = tasks) {
    taskList.innerHTML = '';
    tasksToRender.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        taskElement.innerHTML = `
            <span class="task-title">${task.title}</span>
            <span class="task-description">${task.description}</span>
            <span class="task-due-date">Vence em: ${task.dueDate}</span>
            <button class="complete-btn">Concluir</button>
            <button class="delete-btn">Excluir</button>
        `;
        taskElement.querySelector('.complete-btn').addEventListener('click', () => {
            task.completed = true;
            saveTasks();
            renderTaskList();
        });
        taskElement.querySelector('.delete-btn').addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTaskList();
        });
        taskList.appendChild(taskElement);
    });
}

// Carregar tarefas ao iniciar
loadTasks();
