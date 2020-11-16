// ELEMENTS
const inputEl = document.querySelector("#todo_input");
const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");
const filterEl = document.querySelector(".filter-select");


// FUNCTIONS
createTodoEl = (e) => {
    if (inputEl.value != "") {
        // create a div
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        // create a li el
        const liEl = document.createElement("li");
        liEl.innerHTML = inputEl.value;
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
    }
    // check
    if (item.classList[0] === "check-btn") {
        // add complete style
        todoItem.classList.add("completed");
    }
}

filterList = (e) => {
    switch (filterEl.value) {
        case "all":
            console.log("all");
            break;
        case "completed":
            console.log("completed");
            break;
        case "pending":
            console.log("pending");
            break;
    }
}


// EVENT LISTENERS
addBtn.addEventListener("click", createTodoEl);
todoList.addEventListener("click", deleteCheck);
filterEl.addEventListener("change", filterList);