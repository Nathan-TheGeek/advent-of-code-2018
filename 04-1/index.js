const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    lines = data.split("\n");
    let timeMessagePattern = /\[(\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2})\]\s(.*)/;
    let log = [];
    for(let i=0; i<lines.length; i++){
        let line = lines[i];
        let parsed = timeMessagePattern.exec(line);
        let logEntry = {
            'timestamp': new Date(parsed[1]),
            'providedDateTime': parsed[1],
            'message': parsed[2]
        }
        addSorted(log, logEntry);
    }
    let beginShiftMessage = /Guard \#(\d*) begins shift/;
    let shifts = [];
    let currentShift = null;
    for(let i=0; i<log.length; i++){
        let logEntry = log[i];
        let results = beginShiftMessage.exec(logEntry.message);
        if(results){ // new shift.
            if(currentShift != null){
                shifts.push(currentShift);
            }
            currentShift = {
                guardId: results[1],
                log: []
            };
            currentShift.log.push(logEntry);
        } else {
            currentShift.log.push(logEntry);
        }
    }
    console.log(shifts);
});

function addSorted(array, log) {
    let found = false;
    if(array.length > 0) {
        let indexToInsert = array.length;
        for (let i = 0; i < array.length && !found; i++) {
            if(+array[i].timestamp > +log.timestamp){
                indexToInsert = i;
                found = true;
            }
        }
        if(indexToInsert == array.length){
            array.push(log);
        } else {
            array.splice(indexToInsert, 0, log);
        }
    } else {
        array.push(log);
    }
}
