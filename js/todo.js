let todos = readStorage();


function delTask(id) {

    let deleted = "";

    const index = todos.findIndex(elem => elem.created == id);
    console.log(todos);
    if (index == -1) {
        console.error(`Task "${id}" nicht gefunden. Dies sollte nicht passieren.`);
        return false;
    }
    
    let abfrage = `Soll der folgende ToDo-Eintrag wirklich gelöscht werden?\n${todos[index].todo}`;
    console.log(abfrage);
    if (confirm(abfrage)) {
        console.log("Confirm ok");
        deleted = todos.splice(index,1);
        console.log(deleted);
        alert(`ToDo "${deleted[0].todo}" erfolgreich gelöscht`);
    }
    writeStorage(todos);
    createTodoLI();
}


console.log("todo.js done");