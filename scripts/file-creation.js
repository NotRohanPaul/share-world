/* 
    This script allows creation of sample files that can be used to test the sharing feature. 
    If you do not pass any destination directory the default location of files will be download.
*/
import readline from "node:readline";

const folderName = "sample-files";

readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


