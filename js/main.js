const notify = document.querySelector("#notify");
const tasks = document.querySelector("#todos");
let editTaskId = -1;
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const todoClasses = tasks.classList;
  if (todos !== null) {
    if(todos.length > 0) {
      if (!todoClasses.contains("todo__tasks")) {
        todoClasses.add("todo__tasks");
      }
      const todoTasks = todos.map(function (currentValue) {
        return `<div class="todo__task">
                <div class="todo__task_title ${
                  currentValue.read === true ? "line-through" : ""
                }">${currentValue.title}</div>
                <div class="todo__task_actions">
                  <i class="far fa-eye" onclick="readTask(this)"></i>
                  <i class="fa fa-edit" onclick="editTask(this)"></i>
                  <i class="fa fa-trash" onclick="deleteTask(this)"></i>
                </div>
              </div>`;
      });

      let res = "";
      for (let i = 0; i < todoTasks.length; ++i) {
        res = res.concat(todoTasks[i]);
      }
      tasks.innerHTML = res;  
    } else {
      if (todoClasses.contains("todo__tasks")) {
        todoClasses.remove("todo__tasks");
      }
      tasks.innerHTML = "";
    }    
  } else {    
    if (todoClasses.contains("todo__tasks")) {
      todoClasses.remove("todo__tasks");
    }
    tasks.innerHTML = "";
  }
}

loadTodos();

document
  .querySelector(".todo__input_button")
  .addEventListener("click", function () {
    const todo = document.querySelector(".todo__input_text").value;
    if (todo.trim().length === 0) {
      notify.innerHTML = `<div class="toast toast--warning">
            <div class="toast__icon">
                <i class="fas fa-exclamation-circle toast__icon--warning"></i>
            </div>
            <div class="toast__message">Please add a new todo.</div>
            </div>`;
      setTimeout(function () {
        notify.innerHTML = "";
      }, 5000);
    } else {
      notify.innerHTML = `<div class="toast toast--success">
            <div class="toast__icon">
                <i class="fas fa-check-circle toast__icon--success"></i>
            </div>
            <div class="toast__message">Add a todo successful.</div>
            </div>`;
      setTimeout(function () {
        notify.innerHTML = "";
      }, 5000);
      let todos = JSON.parse(localStorage.getItem("todos"));
      if (editTaskId === -1) {
        if (todos === null) {
          todos = [];
        }
        todos.push({
          title: todo,
          read: false
        });
        localStorage.setItem("todos", JSON.stringify(todos));
        loadTodos();
      } else {
        todos[editTaskId].title = todo;
        todos[editTaskId].read = false;
        localStorage.setItem("todos", JSON.stringify(todos));
        loadTodos();
        editTaskId = -1;
      }
    }
  });

document
  .querySelector(".todo__input_text")
  .addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      const value = this.value;
      if (value.trim().length === 0) {
        notify.innerHTML = `<div class="toast toast--warning">
            <div class="toast__icon">
                <i class="fas fa-exclamation-circle toast__icon--warning"></i>
            </div>
            <div class="toast__message">Please add a new todo.</div>
            </div>`;
        setTimeout(function () {
          notify.innerHTML = "";
        }, 5000);
      } else {
        notify.innerHTML = `<div class="toast toast--success">
            <div class="toast__icon">
                <i class="fas fa-check-circle toast__icon--success"></i>
            </div>
            <div class="toast__message">Add a todo successful.</div>
            </div>`;
        setTimeout(function () {
          notify.innerHTML = "";
        }, 5000);
        let todos = JSON.parse(localStorage.getItem("todos"));
        if (editTaskId === -1) {
          if (todos === null) {
            todos = [];
          }
          todos.push({
            title: value,
            read: false
          });
          localStorage.setItem("todos", JSON.stringify(todos));
          loadTodos();
        } else {
          todos[editTaskId].title = value;
          todos[editTaskId].read = false;
          localStorage.setItem("todos", JSON.stringify(todos));
          loadTodos();
          editTaskId = -1;
        }
      }
    }
  });

function readTask(task) {
  const title = task.parentNode.previousElementSibling.innerHTML.toLowerCase();
  let todos = JSON.parse(localStorage.getItem("todos"));
  for (let i = 0; i < todos.length; ++i) {
    if (todos[i].title.toLowerCase().localeCompare(title) === 0) {
      todos[i].read = !todos[i].read;
      localStorage.setItem("todos", JSON.stringify(todos));
      break;
    }
  }
  loadTodos();
}

function editTask(task) {
  const title = task.parentNode.previousElementSibling.innerHTML;
  let todos = JSON.parse(localStorage.getItem("todos"));
  for (let i = 0; i < todos.length; ++i) {
    if (todos[i].title.toLowerCase().localeCompare(title.toLowerCase()) === 0) {
      editTaskId = i;
      break;
    }
  }
  document.querySelector(".todo__input_text").value = title;
}

function deleteTask(task) {
  const title = task.parentNode.previousElementSibling.innerHTML;
  let todos = JSON.parse(localStorage.getItem("todos"));
  for (let i = 0; i < todos.length; ++i) {
    if (todos[i].title.toLowerCase().localeCompare(title.toLowerCase()) === 0) {
      todos.splice(i, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      break;
    }
  }
  document.querySelector(".todo__input_text").value = "";
  loadTodos();
}
