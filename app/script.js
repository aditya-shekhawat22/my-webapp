// Update status on page load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('status').textContent = 'Online ✓';
    loadTodos();
    updateStats();
});

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (text === '') {
        alert('Please enter a todo!');
        return;
    }

    const todos = getTodos();
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString()
    };

    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    input.value = '';
    loadTodos();
    updateStats();
}

function deleteTodo(id) {
    const todos = getTodos();
    const filtered = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(filtered));
    loadTodos();
    updateStats();
}

function toggleTodo(id) {
    const todos = getTodos();
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
        updateStats();
    }
}

function getTodos() {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
}

function loadTodos() {
    const todos = getTodos();
    const list = document.getElementById('todoList');
    list.innerHTML = '';

    if (todos.length === 0) {
        list.innerHTML = '<li style="text-align: center; color: #999; padding: 20px;">No todos yet. Add one to get started!</li>';
        return;
    }

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input 
                type="checkbox" 
                ${todo.completed ? 'checked' : ''} 
                onchange="toggleTodo(${todo.id})"
            >
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        list.appendChild(li);
    });
}

function updateStats() {
    const todos = getTodos();
    const completedCount = todos.filter(t => t.completed).length;
    
    document.getElementById('total').textContent = todos.length;
    document.getElementById('completed').textContent = completedCount;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
