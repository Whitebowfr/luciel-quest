import { appendFile, readFile } from 'fs/promises';

export async function addToLogs(txt) {
    if (txt) {
        appendFile('./Progress/logs.txt', new Date().toISOString() + ": " + txt + "\n", function (err) {
            console.log(err)
        })
    }
}