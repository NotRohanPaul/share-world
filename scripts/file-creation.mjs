/* 
    This script allows creation of sample files that can be used to test the sharing feature. 
    If you do not pass any destination directory the default location of files will be download.
*/
import readline from "node:readline";
import path from "node:path";
import os from "node:os";

const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const defaultLocation = path.join(os.homedir(), 'Downloads', "sample-files");
const defaultQuantity = 5;
const defaultFileExtension = "txt,md,html,pdf,png";
const defaultSize = "1B,1K,1M,2B,2K,3M";

const fileCreation = (context) => {
    if (context !== "default" || context !== "custom")
        throw new Error(`Wrong context: ${context}`);

    if (context === "default") {

    }
    else {

    }

};

readInterface.question(
    `Defaults:
        Location: ${defaultLocation}
        File Quantity: ${defaultQuantity}
        File Extensions: ${defaultFileExtension}
        File Sizes: ${defaultSize}
     Do you want automatic creation of files with default input? (y/n)`,
    (answer) => {
        console.log('Received:', answer);
        if (answer === undefined || answer === '' || answer.toLowerCase() !== "y") {
            console.log('Switching to custom prompts!');
        } else {
            fileCreation("default");
        }
    });


readInterface.question(
    `What's the location of the files creation? (Defaults to ${defaultLocation})`,
    (location) => {
        console.log('Received:', location);
        if (location === undefined || location === '') {
            console.log('Using default location:', defaultLocation);
        }
    });

readInterface.question(
    `How many files you require? (Defaults to ${defaultQuantity})`,
    (quantity) => {
        console.log('Received:', quantity);
        if (quantity === undefined || quantity === '' || Number.isNaN(Number(quantity))) {
            console.log('Using default value:', 5);
        }
    });
