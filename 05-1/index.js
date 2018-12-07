const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    let str = data.trim();
    let nextReaction = indexOfNextReaction(str);
    while(nextReaction !== -1) {
        str = str.substring(0, nextReaction) + str.substring(nextReaction+2,str.length);
        nextReaction = indexOfNextReaction(str);
    }
    console.log("Result:" + str.length);
});

function indexOfNextReaction(data) {
    for(let i=0; i < data.length-1; i++){
        let currentChar = data.charCodeAt(i);
        let nextChar = data.charCodeAt(i+1);
        if(charIsUppercase(currentChar)) {
            if(charIsLowercase(nextChar)) {
                if(currentChar + 32 === nextChar) {
                    return i;
                }
            }
        } else if (charIsLowercase(currentChar)) {
            if(charIsUppercase(nextChar)) {
                if(currentChar - 32 === nextChar){
                    return i;
                }
            }
        }
    }
    return -1;
}

function charIsUppercase(charCode) {
    // 65 - 90  A - Z
    return charCode >= 65 && charCode <= 90;
}
function charIsLowercase(charCode) {
    // 97 - 122 a - z
    return charCode >= 97 && charCode <= 122; 
}