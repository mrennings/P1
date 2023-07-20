const tasklist = document.getElementById("tasks");
const selFilter = document.getElementById("filter");
const dreiTage = 1000 * 60 * 60 * 24 * 3;
const fuenfTage = 1000 * 60 * 60 * 24 * 5;

function createTodoLI() {
    /*
     * Erstellt das html für die ToDo-Liste; wertet das Filter-Select (Dropdown) aus
    */

    let arr = [];
    switch (selFilter.value) {
        case "open":
            arr = todos.filter(elem => elem.isDone == false);
            break;
        case "done":
            arr = todos.filter(elem => elem.isDone == true);
            break;
        default:
            // Sortierung: offene Tasks oberhalb der erledigten
            arr = todos.filter(elem => elem.isDone == false)
                    .concat(todos.filter(elem => elem.isDone == true));
    };

    tasklist.innerHTML = "";
    let row = 0;
    arr.forEach((todo) => {
        const li = document.createElement("li");
        li.className = todo.isDone ? "task completed" : "task";
        li.classList.add(row % 2 == 0 ? "even" : "odd");
        
        // ! div: Done
        const doneDiv = li.appendChild(document.createElement("div"));
        doneDiv.classList.add("chkbox");
        const doneBox = doneDiv.appendChild(document.createElement("input"));
        // const doneBox = li.appendChild(document.createElement("input"));
        doneBox.setAttribute("type", "checkbox");
        //doneBox.classList.add("chkbox");
        doneBox.checked = todo["isDone"] ? true : false;
        doneBox.addEventListener("change", () => markTaskDone(doneBox, todo.created));

        // ! div: ToDo-Text
        const textDiv = li.appendChild(document.createElement("div"));
        textDiv.classList.add("aufgabe");
        const textTask = textDiv.appendChild(document.createTextNode(todo["todo"]));
        // const textTask = li.appendChild(document.createTextNode(todo["todo"]));
        
        // ! div: Actions (Delete, Edit, Date Created, …)
        const actionsDiv = li.appendChild(document.createElement("div"));
        actionsDiv.classList.add("items")
        
        const btnEdit = actionsDiv.appendChild(document.createElement("i"));
        // const btnEdit = li.appendChild(document.createElement("i"));
        btnEdit.classList.add("fa", "fa-pencil");
        btnEdit.addEventListener("click", () => openModal(todo.created));

        const btnDel = actionsDiv.appendChild(document.createElement("i"));
        // const btnDel = li.appendChild(document.createElement("i"));
        btnDel.classList.add("fa", "fa-trash");
        btnDel.addEventListener("click", () => delTask(todo.created));
        
        const dateDiv = li.appendChild(document.createElement("div"));
        dateDiv.classList.add("dates");
        const textSpan = dateDiv.appendChild(document.createElement("span"));
        textSpan.innerHTML = new Date(todo.created).toLocaleDateString() + " → ";
        const inputDue = textSpan.appendChild(document.createElement("input"));
        inputDue.setAttribute("type", "date");
        inputDue.id = todo.created;
        inputDue.min = new Date().toISOString().replace(/T.*$/, "");
        if (todo.due) {
            inputDue.value = new Date(todo.due).toISOString().replace(/T.*$/, "");
            if (todo.due - dreiTage < Date.now()) {
                inputDue.classList.add("dreiTage");
            } else if (todo.due - fuenfTage < Date.now()) {
                inputDue.classList.add("fuenfTage");
            }
        }
        inputDue.addEventListener("change", (e) => {
            setDueDate(e);
        });
        textSpan.classList.add("date-created");
        //const textCreated = actionsDiv.appendChild(document.createTextNode(new Date(todo.created).toLocaleDateString()));
        // const textCreated = li.appendChild(document.createTextNode(new Date(todo.created).toLocaleDateString()));

        tasklist.appendChild(li);
        row++;
    });
};

// * Wenn Filterbedingung geändert wird, reagieren
selFilter.addEventListener("change", createTodoLI);

// * Initial rendern
createTodoLI();
