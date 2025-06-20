      function addTodo() {
      const input = document.getElementById('todoInput');
      const task = input.value.trim();

      if (task !== '') {
        const li = document.createElement('li');
        li.textContent = task;
        document.getElementById('todoList').appendChild(li);
        const del = document.createElement('button');
        del.textContent = 'Delete';
        del.style.marginLeft = '10px'; // Add some spacing
        del.addEventListener('click', function () {
        li.remove();
        });
        li.appendChild(del);
        document.getElementById('todoList').appendChild(li);
        input.value = '';
        input.placeholder = '';
      }
    
    if (document.getElementById('todoInput').value === '') {
        document.getElementById('todoInput').placeholder = 'Please enter a task';
        }
    SaveData();
    }
    document.getElementById('todoInput').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        addTodo();
      }

    }
    );
    let add = document.getElementById('add');
    add.addEventListener('click', addTodo);
    const todolist = document.getElementById('todoList');

    function SaveData() {
        const todos = [];
        const items = todolist.getElementsByTagName('li');
        for (let i = 0; i < items.length; i++) {
            todos.push(items[i].textContent.replace('Delete', '').trim());
        }
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log(localStorage.setItem('todos', JSON.stringify(todos)));
      
        }
    function LoadData() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(
            function(task) {
            const li = document.createElement('li');
            li.textContent = task;
            const del = document.createElement('button');
            del.textContent = 'Delete';
            del.style.marginLeft = '10px'; // Add some spacing
            del.addEventListener('click', function () {
                li.remove();
                SaveData();
            });
            li.appendChild(del);
            todolist.appendChild(li);
        });
    }
    LoadData();