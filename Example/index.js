var args = require('commander');

args.version('1.0.0')
    .option('-i, --input [type]', 'input to process.')
    .parse(process.argv);

console.log("Input received :[" + args.input + "]");