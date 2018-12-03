const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    lines = data.split("\n");
    var twoCount = 0;
    var threeCount = 0;
    for(var i=0; i<lines.length; i++){
        var countArray = [];
        var found2 = false;
        var found3 = false;
        for(var j=0;j<26;j++){
            countArray[j] = 0;
        }
        var line=lines[i].toUpperCase();
        for(var j=0; j<line.length; j++){
            var charCode = line.charCodeAt(j);
            var charIndex = charCode - "A".charCodeAt(0);
            countArray[charIndex] += 1;
        }
        for(var j=0; j<countArray.length && (!found2 || !found3); j++){
            if(!found2 && countArray[j] === 2){
                found2 = true;
            }
            if(!found3 && countArray[j] === 3){
                found3 = true;
            }
        }
        if(found2){
            twoCount ++;
        }
        if(found3){
            threeCount ++;
        }
    }
    console.log("Result:" + (twoCount * threeCount));
});