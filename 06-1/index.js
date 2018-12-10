const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    let lines = data.split("\n");
    let cordPat = /(\d*)\,\s(\d*)/;
    let coordinates = [];
    let maxX = 0;
    let maxY = 0;
    for(let i=0; i<lines.length; i++){
        let line = lines[i];
        let parsed = cordPat.exec(line);
        let x = parseInt(parsed[1]);
        let y = parseInt(parsed[2]);
        coordinates.push({'x':x,'y':y});
        if(x > maxX) {
            maxX = x;
        }
        if (y > maxY) {
            maxY = y;
        }
    }
    let plotSizes = [];
    for(let i=0; i<coordinates.length; i++){
        plotSizes[i] = 0;
    }
    for(let y=0; y<maxY; y++){
        for(let x=0; x<maxX; x++){
            let closestPlot = calculateClosestPoint(x, y, coordinates);
            if(closestPlot !== null){
                plotSizes[closestPlot] = plotSizes[closestPlot] + 1;
                // if we are on the edge it is an infinite plot.
                if(x === 0 || y === 0 || x === maxY -1 || y === maxX -1){
                    plotSizes[closestPlot] = NaN;
                }
            }
        }
    }
    console.log(JSON.stringify(plotSizes));
    let largestPlot = 0;
    let largestPlotSize = 0;
    for(let i=0; i<plotSizes.length; i++){
        if (plotSizes[i] && plotSizes[i] > largestPlotSize){
            largestPlot = i;
            largestPlotSize = plotSizes[i];
        }
    }
    console.log("Result:" + plotSizes[largestPlot] + " at coordinate#:" + largestPlot);
});

function calculateClosestPoint(x, y, coordinates) {
    let closest = 0;
    let closestDistance = 
        getManhattanDistance(x, y, coordinates[0].x, coordinates[0].y);
    let countAtDistance = 0;
    for(let i=1; i<coordinates.length; i++){
        let cord = coordinates[i];
        let distance = getManhattanDistance(x, y, cord.x, cord.y);
        if(distance < closestDistance){
            closestDistance = distance;
            closest = i;
            countAtDistance = 0;
        } else if (distance === closestDistance) {
            countAtDistance++;
        }
    }
    if(countAtDistance > 1){
        return null;
    } else {
        return closest;
    }
}

function getManhattanDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}