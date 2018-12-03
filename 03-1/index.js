const fs = require('fs');

var height = 0;
var width = 0;
var fabric = [];

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    lines = data.split("\n");
    var pattern = /\#(\d*)\s[@]\s(\d*)\,(\d*)\:\s(\d*)[xX](\d*)/;
    for(var i=0; i<lines.length; i++){
        var line=lines[i].toUpperCase();
        var parsed = pattern.exec(line);
        var secId = parseInt(parsed[1]);
        var secX = parseInt(parsed[2]);
        var secY = parseInt(parsed[3]);
        var secWidth = parseInt(parsed[4]);
        var secHeight = parseInt(parsed[5]);
        // grow the fabric to the size needed.
        while(width <= (secX + secWidth)) {
            addCol();
        }
        while(height <= (secY + secHeight)) {
            addRow();
        }
        for(var w=0; w<secWidth; w++){
            for(var h=0; h<secHeight; h++) {
                pushToPosition((secX + w), (secY + h), secId);
            }
        }
    }
    var doubleClaimCount = 0;
    for(var y=0; y<height; y++){
        for(var x=0; x<width; x++){
            var claims = getPosition(x, y)
            if(claims.length > 1){
                doubleClaimCount++;
            }
        }
    }
    console.log("Result:" + doubleClaimCount);
});

function addRow() {
    var tempRow = [];
    for(var i=0; i<width; i++) {
        tempRow.push([]);
    }
    fabric.push(tempRow);
    height++;
}
function addCol() {
    for(var i=0; i<fabric.length; i++){
        fabric[i].push([]);
    }
    width++;
}
function getPosition(x, y) {
    return fabric[y][x];
}
function pushToPosition(x, y, val) {
    fabric[y][x].push(val);
}