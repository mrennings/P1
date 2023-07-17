// Beipsieldaten erstellen 
const sampleData = [
    {
        "todo": "Test 1 (now)",
        "prio": "B",
        "due": "",
        "created": Date.now(),
        "start": "",
        "done": "",
        "isDone": false,
        "context": "@None",
        "project": "+None"
    }, {
        "todo": "Test 2 (last week)",
        "prio": "B",
        "due": "",
        "created": Date.now() - 604800000,
        "start": "",
        "done": "",
        "isDone": false,
        "context": "@None",
        "project": "+None"
    }, {
        "todo": "Test 3 (half week ago)",
        "prio": "B",
        "due": "",
        "created": Date.now() - 302400000,
        "start": "",
        "done": "",
        "isDone": false,
        "context": "@None",
        "project": "+None"
    }
];
//Beispieldaten speichern
function saveSample() {
    writeStorage(sampleData);
}