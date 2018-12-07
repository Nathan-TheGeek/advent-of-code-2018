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
                    totalMinAsleep: 0,
                    minuteAgg: [],
                    shifts: {}
                };
                for(let j=0; j<60; j++) {
                    currentGuard.minuteAgg[j] = 0;
                }
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
                    currentGuard.totalMinAsleep++;
                    currentGuard.minuteAgg[j] = currentGuard.minuteAgg[j] + 1;
                }
            }
        }
    }
    let maxAsleepTime = 0;
    let maxAsleepId = 0;
    let maxAsleepMinute = 0;
    for (let guardId in guards) {
        let guard = guards[guardId];
        for(let i=0; i<guard.minuteAgg.length; i++){
            if(guard.minuteAgg[i] > maxAsleepTime){
                maxAsleepTime = guard.minuteAgg[i];
                maxAsleepId = guard.guardId;
                maxAsleepMinute = i;
            }
        }
    }
    // printGuardGraph(sleepiestGuard);

    console.log("Sleepiest Guard:" + maxAsleepId + " Sleepiest Time:" + maxAsleepMinute + " Result:[" + (maxAsleepId * maxAsleepMinute) + "]");
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

function printGuardGraph(guard) {
    console.log("Guard #" + guard.guardId);
    let First = "";
    let Second = "";
    for(var i=0; i<60; i++){
        First += Math.floor(i/10).toString();
        Second += (i%10).toString();
    }
    console.log(First);
    console.log(Second);
    for(let shiftId in guard.shifts) {
        let line = "";
        if(guard.shifts.hasOwnProperty(shiftId)) {
            for(var i=0; i<60; i++) {
                line += guard.shifts[shiftId][i];
            }
        }
        console.log(line);
    }
    let hr = "";
    for(let i=0;i<80;i++) {
        hr += "-";
    }
    console.log(hr);
}
