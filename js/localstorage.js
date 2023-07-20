function writeStorage(list) {
    /*
     * Erwartet ein JSON-Objekt mit den ToDos und schreibt es in 
     * den localStorage
     * 
     * list             die zu speichernden ToDos als Liste
     * 
     * return true      bei erfolgreichem Schreiben
     * return false     bei Fehlern
    */

    if (list == null) {
        console.error("Liste leer? Keine Liste übergeben?")
        return false;
    }

    try {
        localStorage.setItem("ToDo", JSON.stringify(list));
        // console.log(JSON.stringify(list));
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
     * return [ToDos]
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
    if (todos != null) {
        return JSON.parse(todos);
    } else {
        return [];
    }
}


function clearStorage() {
    localStorage.clear()
    console.log("localStorage cleared");
}
