var args = require('commander');
const fs = require('fs');

args.version('1.0.0')
    .option('-i, --input [type]', 'input to process.')
    .parse(process.argv);

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    lines = data.split("\n");
    var frequency = 0;
    var foundDuplicate = false;
    var foundFrequencies = [];
    var firstDuplicate = 0;
    while(!foundDuplicate){
        for(var i=0; i<lines.length && !foundDuplicate; i++){
            var line=lines[i];
            var opp = line[0];
            var num = line.substring(1,line.length);
            if (opp == '+') {
                frequency += parseInt(num);
            } else if (opp == '-') {
                frequency -= parseInt(num);
            }
            if(foundFrequencies.includes(frequency)){
                foundDuplicate = true;
                firstDuplicate = frequency;
            } else {
                foundFrequencies.push(frequency);
            }
        }
    }
    console.log("Result:" + firstDuplicate);
});