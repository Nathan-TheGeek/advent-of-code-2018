const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    let lines = data.split("\n");
    let cordPat = /(\d*)\,\s(\d*)/;
    let cordinates = [];
    let maxX = 0;
    let maxY = 0;
    for(let i=0; i<lines.length; i++){
        let line = lines[i];
        let parsed = cordPat.exec(line);
        let x = parsed[1];
        let y = parsed[2];
        cordinates.push({'x':x,'y':y});
        if(x > maxX) {
            maxX = x;
        }
        if (y > maxY) {
            maxY = y;
        }
    }
    let map = [];
    for(var y=0; y<maxY; y++){
        let row = [];
        for(var x=0; x<maxX; x++){
            row[x] = calculateClosestPoint(x, y, cordinates);
        }
        map[y] = row;
    }
    let infinatePlots = [];
    for(let i= 0; i<map.length; i++){
        if(!infinatePlots.includes(map[i][0])){
            infinatePlots.push(map[i][0]);
        }
        if(!infinatePlots.includes(map[i][map[i].length -1])){
            infinatePlots.push(map[i][map[i].length -1]);
        }
    }
    for(let i=0; i<map[0].length; i++){
        if(!infinatePlots.includes(map[0][i])){
            infinatePlots.push(map[0][i]);
        }
        if(!infinatePlots.includes(map[map.length - 1][i])){
            infinatePlots.push(map[map.length - 1][i]);
        }
    }
    console.log(infinatePlots);
    //console.log("Result:" + str.length);
});

function calculateClosestPoint(x, y, cordinates) {
    let closest = 0;
    let closestDistance = 
        getManhattanDistance(x, y, cordinates[0].x, cordinates[0].y);
    for(let i=1; i<cordinates.length; i++){
        let cord = cordinates[i];
        let distance = getManhattanDistance(x, y, cord.x, cord.y);
        if(distance < closestDistance){
            closestDistance = distance;
            closest = i;
        }
    }
    return closest;
}

function getManhattanDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}