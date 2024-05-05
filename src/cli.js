#!/usr/bin/env node

const readline = require('readline');
const { executeSELECT, executeINSERT, executeDELETE } = require('./queryExecutor');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('SQL> ');
console.log('SQL Query Engine CLI. Enter your SQL commands, or type "exit" to quit.');

rl.prompt();

rl.on('line', async (line) => {
    if (line.toLowerCase() === 'exit') {
        rl.close();
        return;
    }

    try {
        // Execute the SQL query
        if (/^\s*SELECT/i.test(line)) {
            const result = await executeSELECT(line);
            console.log('Result:', result);
        } else if (/^\s*INSERT\s+INTO/i.test(line)) {
            const result = await executeINSERT(line);
            console.log(result.message);
        } else if (/^\s*DELETE\s+FROM/i.test(line)) {
            const result = await executeDELETE(line);
            console.log(result.message);
        } else {
            console.log('Unsupported command');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }

    rl.prompt();
}).on('close', () => {
    console.log('Exiting SQL CLI');
    process.exit(0);
});
