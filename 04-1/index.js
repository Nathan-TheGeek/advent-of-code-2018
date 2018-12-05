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
    let guards = {};
    let currentGuard = null;
    let currentShiftId = null;
    let lastAsleep = -1;
    for(let i=0; i<log.length; i++){
        let logEntry = log[i];
        let results = beginShiftMessage.exec(logEntry.message);
        // let 
        //console.log(shiftId);
        if (results) { // new shift.
            let currentGuardId = +(results[1]);
            currentShiftId = "shift_" + currentGuardId + "_" + i;
            currentGuard = guards['guard_' + currentGuardId];
            lastAsleep = -1;
            if (currentGuard === undefined) {
                currentGuard = {
                    guardId: currentGuardId,
                    shifts: {}
                };
                guards['guard_' + currentGuardId] = currentGuard;
            }
            currentGuard.shifts[currentShiftId] = [];
            for(let j=0; j<60; j++) {
                currentGuard.shifts[currentShiftId][j] = ' ';
            }
        } else {
            let minute = +(logEntry.providedDateTime.substring(14, 16));
            if (logEntry.message === "falls asleep"){
                lastAsleep = minute;
            } else if (logEntry.message === "wakes up") {
                for(let j=lastAsleep; j<minute; j++){
                    currentGuard.shifts[currentShiftId][j] = "X";
                }
            }
        }
    }
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
