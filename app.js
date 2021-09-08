// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filerOption = document.querySelector(".filter-todo");

// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filerOption.addEventListener("click", filterTodo);

// Load TODOS
window.onload = getTodos();

// All Functions Decleration
function addTodo(event) {
    event.preventDefault();

    /* Blueprint HTML
    <div class="todo">
    <li class="todo-item"></li>
    <button class="complete-btn">Delete</button>
    <button class="trash-btn">Checked</button>
    </div> */

    if(todoInput.value == "") {
        alert("Cannot add empty ToDo");
        return;
    }

    // Create TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerHTML = "<b>" + todoInput.value + "</b>";
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);

    // Add TODO to LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    // Create TODO BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append the DIV to UL
    todoList.appendChild(todoDiv);

    // Clear INPUT
    todoInput.value = "";

}

//localStorage.clear();

function deleteCheck(event) {
    const item = event.target;
    if (item.classList[0] == "trash-btn") {
        const todo = item.parentElement;
        removeLocalTodo(todo);
        todo.remove();

    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    console.log(todos)
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }

    });
}

function saveLocalTodos(todo) {
    //CHECK: DO I ALREADY HAVE THING IN THERE
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))

    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {
    //CHECK: DO I ALREADY HAVE THING IN THERE
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Create LI
        const newTodo = document.createElement("li");
        newTodo.innerHTML = "<b>" + todo + "</b>";
        newTodo.classList.add("todo-item");

        todoDiv.appendChild(newTodo);

        // Create TODO BUTTON
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check'></i>";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Append the DIV to UL
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodo(todo) {
    //CHECK: DO I ALREADY HAVE THING IN THERE
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    let todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos));
}



