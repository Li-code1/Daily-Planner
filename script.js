
// Seletores dos elementos principais
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

// Renderiza todas as tarefas (visualizar)
function renderTaskList(list = tasks) {
    taskList.innerHTML = '';
    if (list.length === 0) {
        taskList.innerHTML = '<li>Nenhuma tarefa encontrada.</li>';
        return;
    }
    list.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task' + (task.completed ? ' completed' : '');
        li.innerHTML = `
            <span class="task-title">${task.title}</span><br>
            <span class="task-description">${task.description}</span><br>
            <span class="task-due-date">${task.dueDate ? 'Vencimento: ' + task.dueDate : ''}</span><br>
            <button class="complete-btn">${task.completed ? 'Desfazer' : 'Concluir'}</button>
            <button class="remove-btn">Excluir</button>
        `;
        // Marcar como concluída
        li.querySelector('.complete-btn').addEventListener('click', () => {
            task.completed = !task.completed;
            renderTaskList();
        });
        // Excluir tarefa
        li.querySelector('.remove-btn').addEventListener('click', () => {
            tasks.splice(idx, 1);
            renderTaskList();
        });
        taskList.appendChild(li);
    });
}

// Adicionar tarefas
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const dueDate = dueDateInput.value;
    if (!title) return;
    const task = { title, description, dueDate, completed: false };
    tasks.push(task);
    renderTaskList();
    titleInput.value = '';
    descriptionInput.value = '';
    dueDateInput.value = '';
});

// Filtrar tarefas por data de vencimento
filterBtn.addEventListener('click', () => {
    const filterDate = filterDateInput.value;
    if (!filterDate) {
        renderTaskList();
        return;
    }
    const filteredTasks = tasks.filter((task) => task.dueDate === filterDate);
    renderTaskList(filteredTasks);
});

// Salvar tarefas no armazenamento local
saveBtn.addEventListener('click', () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
});

// Carregar tarefas salvas
loadBtn.addEventListener('click', () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTaskList();
    }
});

// Renderizar ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTaskList();
});
