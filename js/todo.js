let todos = readStorage();

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

function getIndex(id) {
    /*
     * Hilfsfunktion
     * Liefert den Index im Array [todos] des Eintrags »id« zurück
     * 
     * id               Task-ID des zu suchenden Eintrags
     * 
     * return index     Index des zu suchenden Eintrags in [todos]
    */
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


const openModal = function (id) {
    /*
     * Öffnet das Modal-Fenster zum Bearbeiten eines Eintrags
     * 
     * id               ID des zu bearbeitenden Eintrags
    */
    const index = getIndex(id);
    document.getElementById("editTitle").innerHTML = `${todos[index].todo} bearbeiten`;
    const editTask = document.getElementById("editTask");
    editTask.value = todos[index].todo;

    const updTask = document.getElementById("updTask");
    updTask.addEventListener("click", () => updateTask(id, editTask.value));
    updTask.addEventListener("keydown", (e) => {
        // Funktioniert noch nciht ganz wie gedacht, nur via Tab+Enter
        if (e.key === "Enter" && !modal.classList.contains("hidden")) {
            updateTask(id, editTask.value);
        }
    })

    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function () {
    // * »Schließt« das Modal-Fenster per Mausklick
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    // * »Schließt« das Modal-Fenster per Escape-Taste
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

function updateTask(id, text) {
    /*
     * Akutalisiert einen Task mit den übergebenen Werten
     *
     * id               ID des zu aktualisieren Tasks
     * text             Neuer Aufgabentext
    */
    const index = getIndex(id);
    todos[index].todo = text;

    closeModal();

    writeStorage(todos);
    createTodoLI();
}