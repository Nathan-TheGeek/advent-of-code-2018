const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    lines = data.split("\n");
    var commons = []
    for(var i=0; i<lines.length-1; i++){
        var line=lines[i].toUpperCase();
        for(var j=i+1;j<lines.length; j++){
            var nextLine = lines[j].toUpperCase();
            var common = "";
            for(var k=0; k<line.length; k++){
                if(line.charAt(k) === nextLine.charAt(k)){
                    common += line.charAt(k);
                }
            }
            commons.push(common);
        }
    }
    var longest = '';
    for(var i=0; i<commons.length; i++){
        if(commons[i].length > longest.length){
            longest = commons[i];
        }
    }
    console.log("Result:"+longest);
});