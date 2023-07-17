const tasklist = document.getElementById("tasks");


function createTodoLI() {
    tasklist.innerHTML = "";
    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.classList.add("task");
        if (todo.isDone) {
            li.className ="task completed";
        } else {
            li.className = "task";
        }
        // ! div: Done
        const doneDiv = li.appendChild(document.createElement("div"));
        const doneBox = doneDiv.appendChild(document.createElement("input"));
        doneBox.setAttribute("type", "checkbox");
        doneBox.classList.add("chkbox");
        doneBox.checked = todo["isDone"] ? true : false;
        doneBox.addEventListener("change", () => markTaskDone(doneBox, todo.created));

        // ! div: ToDo-Text
        const textDiv = li.appendChild(document.createElement("div"));
        const textTask = textDiv.appendChild(document.createTextNode(todo["todo"]));
        
        // ! div: Actions (Delete, Edit, Date Created, …)
        const actionsDiv = li.appendChild(document.createElement("div"));
        // taskID == date created
        const taskID = actionsDiv.appendChild(document.createElement("input"));
        taskID.setAttribute("type", "hidden");
        taskID.value = todo["created"];
        
        const btnEdit = actionsDiv.appendChild(document.createElement("i"));
        btnEdit.classList.add("fa", "fa-pencil");
        const btnDel = actionsDiv.appendChild(document.createElement("i"));
        btnDel.classList.add("fa", "fa-trash");
        btnDel.addEventListener("click", () => delTask(todo.created));
        
        // const textCreated = actionsDiv.appendChild(document.createElement("input"));
        // textCreated.setAttribute("type", "text");
        const textCreated = actionsDiv.appendChild(document.createTextNode(new Date(todo.created).toLocaleDateString()));
        // textCreated.classList.add("createdDate");
        // textCreated.readOnly = true;
        // textCreated.value = new Date(todo["created"]).toLocaleDateString();

        tasklist.appendChild(li);
    });
};


createTodoLI();
console.log("html.js done");
