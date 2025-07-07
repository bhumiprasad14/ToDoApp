function addTodo() {
  const input = document.getElementById('todoInput');
  const task = input.value.trim();

  if (task !== '') {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    li.appendChild(checkbox);

    const span = document.createElement('span');
    span.textContent = task;
    li.appendChild(span);

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.style.marginLeft = '10px';
    del.addEventListener('click', function () {
      li.remove();
      SaveData();
    });
    li.appendChild(del);

    document.getElementById('todoList').appendChild(li);
    input.value = '';
    input.placeholder = '';
    SaveData();
  } else {
    document.getElementById('todoInput').placeholder = 'Please enter a task';
  }
}

document.getElementById('todoInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});

let add = document.getElementById('add');
add.addEventListener('click', addTodo);
const todolist = document.getElementById('todoList');

function SaveData() {
  const todos = [];
  const items = todolist.getElementsByTagName('li');
  for (let i = 0; i < items.length; i++) {
    const checkbox = items[i].querySelector('input[type="checkbox"]');
    const span = items[i].querySelector('span');
    todos.push({
      text: span.textContent.trim(),
      checked: checkbox.checked
    });
  }
  localStorage.setItem('todos', JSON.stringify(todos));
}

function LoadData() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(function(todo) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.checked; // restore checked state
    checkbox.addEventListener('change', SaveData);
    li.appendChild(checkbox);

    const span = document.createElement('span');
    span.textContent = todo.text;
    li.appendChild(span);

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.style.marginLeft = '10px';
    del.addEventListener('click', function () {
      li.remove();
      SaveData();
    });
    li.appendChild(del);

    todolist.appendChild(li);
  });
}
LoadData();