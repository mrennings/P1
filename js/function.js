// Neue Aufgabe
function addTask() {
    const taskInput = document.getElementById('input-task');
    const taskValue = taskInput.value.trim();
    console.log(addTask);

    if (taskValue === '') {
        const errorDiv = document.getElementById('error');
        errorDiv.textContent = 'Was willst du erledigen?';
        errorDiv.style.display = 'block';
        return;
    }

    taskInput.value = '';
    // hideError();

    const newTask = {
        "todo": taskValue,
        "isDone": false,
        "created": Date.now(),
    };

    todos.push(newTask);

    writeStorage(todos);
    createTodoLI();
    console.log(todos);
}

// EventListener
const addTaskButton = document.getElementById("add-task");
addTaskButton.addEventListener("click", addTask);

// // Löschen einer Aufgabe
// function deleteTask(event) {
// const taskItem = event.target.closest('.task');
// taskItem.remove();
// }


