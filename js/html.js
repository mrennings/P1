const tasklist = document.getElementById("tasks");


function createTodoLI() {
    tasklist.innerHTML = "";
    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.classList.add("task");
        li.className = todo.isDone ? "task completed" : "task";

        // ! div: Done
        const doneDiv = li.appendChild(document.createElement("div"));
        const doneBox = doneDiv.appendChild(document.createElement("input"));
        // const doneBox = li.appendChild(document.createElement("input"));
        doneBox.setAttribute("type", "checkbox");
        doneBox.classList.add("chkbox");
        doneBox.checked = todo["isDone"] ? true : false;
        doneBox.addEventListener("change", () => markTaskDone(doneBox, todo.created));

        // ! div: ToDo-Text
        const textDiv = li.appendChild(document.createElement("div"));
        const textTask = textDiv.appendChild(document.createTextNode(todo["todo"]));
        // const textTask = li.appendChild(document.createTextNode(todo["todo"]));
        
        // ! div: Actions (Delete, Edit, Date Created, …)
        const actionsDiv = li.appendChild(document.createElement("div"));
        
        const btnEdit = actionsDiv.appendChild(document.createElement("i"));
        // const btnEdit = li.appendChild(document.createElement("i"));
        btnEdit.classList.add("fa", "fa-pencil");
        btnEdit.addEventListener("click", () => openModal(todo.created));

        const btnDel = actionsDiv.appendChild(document.createElement("i"));
        // const btnDel = li.appendChild(document.createElement("i"));
        btnDel.classList.add("fa", "fa-trash");
        btnDel.addEventListener("click", () => delTask(todo.created));
        
        const textCreated = actionsDiv.appendChild(document.createTextNode(new Date(todo.created).toLocaleDateString()));
        // const textCreated = li.appendChild(document.createTextNode(new Date(todo.created).toLocaleDateString()));

        tasklist.appendChild(li);
    });
};


createTodoLI();
