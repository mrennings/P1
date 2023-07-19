// Neue Aufgabe
function addTask() {
    const taskInput = document.getElementById('input-task');
    const taskValue = taskInput.value.trim();
    const errorDiv = document.getElementById('error');

    if ( !isTextValid(taskValue)) {
        errorDiv.textContent = 'Was willst du erledigen?';
        errorDiv.style.display = 'block';
        return;
    }

    taskInput.value = '';
    // hideError();

    const newTask = {
        "todo": taskValue,
        "prio": "B",
        "due": "",
        "created": Date.now(),
        "start": "",
        "done": "",
        "isDone": false,
        "context": "@None",
        "project": "+None"
    };

    errorDiv.style.display = 'none';
    todos.push(newTask);

    writeStorage(todos);
    createTodoLI();
}

// EventListener
const addTaskButton = document.getElementById("add-task");
addTaskButton.addEventListener("click", addTask);


