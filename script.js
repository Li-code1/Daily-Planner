const taskList = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const dueDateInput = document.getElementById('due-date');
const filterDateInput = document.getElementById('filter-date');
const filterBtn = document.getElementById('filter-btn');
const saveBtn = document.getElementById('save-btn');
const loadBtn = document.getElementById('load-btn');

let tasks = [];

// 1. Adicionar tarefas
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const description = descriptionInput.value;
    const dueDate = dueDateInput.value;
    const task = { title, description, dueDate, completed: false };
    tasks.push(task);
    renderTaskList();
    titleInput.value = '';
    descriptionInput.value = '';
    dueDateInput.value = '';
});

// 2. Filtrar tarefas
filterBtn.addEventListener('click', () => {
    const filterDate = filterDateInput.value;
    const filteredTasks = tasks.filter((task) => task.dueDate === filterDate);
    renderTaskList(filteredTasks);
});

// 3. Salvar tarefas
saveBtn.addEventListener('click', () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
});

// 4. Carregar tarefas
loadBtn.addEventListener('click', () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTaskList();
    }
});

// 5.
