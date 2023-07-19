let todos = readStorage();

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");
const btnUpdate = document.getElementById("updTask");
let update;

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

function isTextValid(text) {
    /*
     * Überprüft den übergebenen String auf Gültigkeit
     *
     * text             der zu prüfende Text
     *
     * return true      wenn Text gültig
     * return false     wenn Text ungültig
    */
    // return (text != "" && text != undefined && text != null)
    let t = text.trim();
    return /^[\w(!]/.test(t);
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
    document.getElementById("editTitle").innerHTML = `»${todos[index].todo}« bearbeiten`;
    const inputTask = document.getElementById("editTask");
    inputTask.value = todos[index].todo;

    update = () => {
        updateTask(index, inputTask.value);
    }
    // const updTask = document.getElementById("updTask");
    btnUpdate.addEventListener("click", update);

    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    // * »Schließt« das Modal-Fenster
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    btnUpdate.removeEventListener("click", update);
};

closeModalBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    // * »Schließt« das Modal-Fenster per Escape-Taste
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

function updateTask(index, text) {
    /*
     * Aktualisiert einen Task mit den übergebenen Werten
     *
     * index            Index des zu aktualisieren Tasks
     * text             Neuer Aufgabentext
    */
    if (isTextValid(text)) {
        todos[index].todo = text;
    } else {
        alert("Eingabe fehlerhaft");
    }
    closeModal();

    writeStorage(todos);
    createTodoLI();
}

const btnClearAll = document.getElementById("clear-btn").addEventListener("click", () => {
    clearStorage();
    todos = [];
    createTodoLI();
});
