function writeStorage(json) {
    /*
     * Erwartet ein JSON-Objekt mit den ToDos und schreibt es in 
     * den localStorage
     * 
     * json             die zu speichernden ToDos als JSON
     * 
     * return true      bei erfolgreichem Schreiben
     * return false     bei Fehlern
    */
    try {
        localStorage.setItem("ToDo", json);
    } catch (error) {
        console.error("Fehler in writeStorage(): " + error);
        return false;
    }
    return true;
}


function readStorage() {
    /*
     * Liest die ToDos aus dem localStorage und gibt sie zurück.
     * Bei Fehlern wird eine entsprechende Fehlermeldung im JSON-Objekt
     * zurückgegeben.
     * 
     * return {JSON}
    */
    let todos = {};
    try {
        todos = localStorage.getItem("ToDo");
    } catch (error) {
        console.error("Fehler in readStorage(): " + error);
        todos = JSON.stringify({error: "Fehler beim Einlesen der Daten aus dem LocalStorage",
            msg: error
        });
    }
    return JSON.parse(todos);
}


function clearStorage() {
    localStorage.clear()
    console.log("localStorage cleared");
}

console.log("localstorage.js done");