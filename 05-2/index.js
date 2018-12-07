const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    let possibilities = [];
    for(let i=0;i<26; i++) {
        let str = removeAllOfChar(i, data.trim());
        let finalStr = reactString(str);
        possibilities[i] = finalStr.length;
    }
    let minIndex = 0;
    for(i=0; i<possibilities.length; i++) {
        if(possibilities[i] < possibilities[minIndex]) {
            minIndex = i;
        }
    }
    console.log("Result:" + possibilities[minIndex] + " with removing the [" + String.fromCharCode(minIndex+65) + "] character.");
});

function reactString(str) {
    let nextReaction = indexOfNextReaction(str);
    while (nextReaction !== -1) {
        str = str.substring(0, nextReaction) + str.substring(nextReaction + 2, str.length);
        nextReaction = indexOfNextReaction(str);
    }
    return str
}

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

function removeAllOfChar(charNumber, str) {
    let uppercaseChar = String.fromCharCode(charNumber + 65);
    let lowercaseChar = String.fromCharCode(charNumber + 97);
    let re = new RegExp("[" + uppercaseChar + lowercaseChar + "]", "g");
    return str.replace(re,'');
}

function charIsUppercase(charCode) {
    // 65 - 90  A - Z
    return charCode >= 65 && charCode <= 90;
}
function charIsLowercase(charCode) {
    // 97 - 122 a - z
    return charCode >= 97 && charCode <= 122; 
}