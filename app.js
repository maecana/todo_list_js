// ELEMENTS
const inputEl = document.querySelector("#todo_input");
const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");
const filterEl = document.querySelector(".filter-select");


// FUNCTIONS
createTodoEl = (e) => {
    if (inputEl.value != "") {
        // create a todo element
        todoEl(inputEl.value);

        // set local storage
        saveToLocalStorage(inputEl.value);
        
        // empty input field and focus
        inputEl.value = "";
        inputEl.focus();
    } else {
        inputEl.focus();
    }
}


deleteCheck = (e) => {
    const item = e.target;
    let todoItem = item.parentElement;

    // delete
    if (item.classList[0] === "trash-btn") {
        // add fall effect
        todoItem.classList.add("fall");

        // remove after effect
        todoItem.addEventListener("transitionend", () => {
            todoItem.remove();
        });
            
        // remove from local storage
        deleteLocalItem(todoItem.childNodes[0].innerText);
    }

    // check
    if (item.classList[0] === "check-btn") {
        // add complete style
        todoItem.classList.add("completed");
    }
}


filterList = (e) => {
    const todoItem = todoList.childNodes;

    switch (filterEl.value) {
        case "completed":
            todoItem.forEach((item) => {
                if (item.classList.contains("completed")) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
            });
            break;
        case "pending":
            todoItem.forEach((item) => {
                if (!item.classList.contains("completed")) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
            });
            break;
        default:
            todoItem.forEach((item) => {
                item.style.display = "flex";
            });
    }
}


saveToLocalStorage = (item) => {
    let todoList = checkLocalStorage();
    
    todoList.push(item);
    localStorage.setItem("todos", JSON.stringify(todoList));
}


deleteLocalItem = (item) => {
    let todoList = checkLocalStorage();
    
    const index = todoList.indexOf(item);
    todoList.splice(index, 1);

    localStorage.setItem("todos", JSON.stringify(todoList));
}


setLocalItems = () => {
    let list = checkLocalStorage();

    list.forEach((item) => {
        // create a todo element
        todoEl(item);
    });
}


checkLocalStorage = () => {
    const localTodoList = localStorage.getItem("todos");
    let list = [];

    if (localTodoList != null) {
        list = JSON.parse(localTodoList);
    }

    return list;
}


todoEl = (item) => {
    // create a div
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    // create a li el
    const liEl = document.createElement("li");
    liEl.innerHTML = item;
    todoItem.appendChild(liEl);

    // create check button
    const checkBtn = document.createElement("button");
    checkBtn.innerText = "/";
    checkBtn.classList.add("check-btn");
    todoItem.appendChild(checkBtn);

    // create a trash button
    const trashBtn = document.createElement("button");
    trashBtn.innerText = "X";
    trashBtn.classList.add("trash-btn");
    todoItem.appendChild(trashBtn);

    // add to todo list
    todoList.appendChild(todoItem);
}


// EVENT LISTENERS
window.addEventListener("DOMContentLoaded", (e) => {
    setLocalItems();
});
addBtn.addEventListener("click", createTodoEl);
todoList.addEventListener("click", deleteCheck);
filterEl.addEventListener("change", filterList);
