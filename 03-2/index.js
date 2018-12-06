const fs = require('fs');

var height = 0;
var width = 0;
var fabric = [];
var claims = [];

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    lines = data.split("\n");
    var pattern = /\#(\d*)\s[@]\s(\d*)\,(\d*)\:\s(\d*)[xX](\d*)/;
    for(var i=0; i<lines.length; i++){
        var line = lines[i].toUpperCase();
        var parsed = pattern.exec(line);
        var claim = {
            parsed: pattern.exec(line),
            secId: parseInt(parsed[1]),
            secX: parseInt(parsed[2]),
            secY: parseInt(parsed[3]),
            secWidth: parseInt(parsed[4]),
            secHeight: parseInt(parsed[5])
        };
        claims.push(claim);
        // grow the fabric to the size needed.
        while(width <= (claim.secX + claim.secWidth)) {
            addCol();
        }
        while(height <= (claim.secY + claim.secHeight)) {
            addRow();
        }
        for(var w=0; w<claim.secWidth; w++){
            for(var h=0; h<claim.secHeight; h++) {
                pushToPosition((claim.secX + w), (claim.secY + h), claim.secId);
            }
        }
    }
    var nonOverlappingClaim = null
    for (var i = 0; i < claims.length && !nonOverlappingClaim; i++) {
        var claim = claims[i];
        var claimOverlaps = false;
        for (var w = 0; w < claim.secWidth; w++) {
            for (var h = 0; h < claim.secHeight; h++) {
                if(getPosition((claim.secX + w), (claim.secY + h)).length > 1) {
                    claimOverlaps = true;
                }
            }
        }
        if(!claimOverlaps) {
            nonOverlappingClaim = claim;
        }
    }
    console.log("Result:" + nonOverlappingClaim.secId);
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