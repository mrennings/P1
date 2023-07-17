let todos = readStorage();

function getIndex(id) {
    return todos.findIndex(elem => elem.created == id);
}

function delTask(id) {
    /*
     * Löscht den angegeben Task
     *
     * id               Task-Id des zu löschenden Task (Timestamp created)
     * 
     * return false     Wenn ID nicht gefunden, oder abgebrochenem Löschen
     * return true      Nach erfolgreichem Löschen
    */
    let deleted = "";

    //const index = todos.findIndex(elem => elem.created == id);
    const index = getIndex(id);
    console.log(todos);
    if (index == -1) {
        console.error(`Task "${id}" nicht gefunden. Dies sollte nicht passieren.`);
        return false;
    }
    
    let abfrage = `Soll der folgende ToDo-Eintrag wirklich gelöscht werden?\n\n\t${todos[index].todo}`;
    if (confirm(abfrage)) {
        deleted = todos.splice(index,1);
        alert(`ToDo "${deleted[0].todo}" erfolgreich gelöscht`);
    } else {
        return false;
    }
    writeStorage(todos);
    createTodoLI();
    return true;
}

function markTaskDone(chkbox, id) {
    /*
     * Markiert den entsprechenden Eintrag als erledigt, oder hebt die Markierung auf
     *
     * chkbox           Checkbox, auf die geklickt wurde
     * id               Task-ID des zu bearbeitenden Eintrags
    */

    const index = getIndex(id);
    if (chkbox.checked) {
        todos[index].isDone = true;
        todos[index].done = Date.now();
    } else {
        todos[index].isDone = false;
        todos[index].done = "";
    }
    writeStorage(todos);
    createTodoLI();


}
console.log("todo.js done");