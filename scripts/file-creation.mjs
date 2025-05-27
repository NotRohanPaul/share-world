/* 
    This script allows creation of sample files that can be used to test the sharing feature. 
    If you do not pass any destination directory the default location of files will be users downloads location which is best location for testing.
*/
import readline from "node:readline";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";

const readInterface = readline.promises.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const defaultLocation = path.join(os.homedir(), 'Downloads', "sample-files");
const defaultQuantity = 5;
const defaultFileExtensions = "txt,md,html,pdf,png";
const defaultSizes = "1B,1K,1M,2B,2K,3M";

/* Questions */
const questionsStringObj = {
    initial: `Defaults:
    Location: ${defaultLocation}
    File Quantity: ${defaultQuantity}
    File Extensions: ${defaultFileExtensions}
    File Sizes: ${defaultSizes} 
Do you want automatic creation of files with default input? (y/n): `,
    location: `What's the location of the files creation? (Defaults to ${defaultLocation}): `,
    quantity: `How many files you require? (Defaults to ${defaultQuantity}): `,
    fileExtensions: `Enter the files extensions? (Defaults to these ${defaultFileExtensions}): `,
    sizes: `Enter the sizes of the files? (Defaults to these ${defaultSizes}): `,
};


/* Handlers */
const defaultFilesHandler = async () => {
    try {
        await fs.promises.access(defaultLocation, fs.constants.W_OK | fs.constants.R_OK);
        console.log(`Folder: ${defaultLocation} is accessible`);
        await fs.promises.mkdir(defaultLocation);
        console.log(`Additional Required Folders is created`);
    }
    catch (err) {
        console.log(`Folder: ${defaultLocation} is NOT accessible may be its not present or the OS or AntiMalware is blocking the script from accessing it.`);
        throw err;
    };


};
const customFilesHandler = () => {

};

const contextHandler = (context) => {
    if (context !== "default" && context !== "custom")
        throw new Error(`Wrong context: ${context}`);

    if (context === "default") {
        defaultFilesHandler();
    }
    else {
        customFilesHandler();
    }

};


const questionsHandler = async () => {
    const initialAnswer = await readInterface.question(questionsStringObj.initial);
    console.log('Received:', initialAnswer);
    if (initialAnswer === undefined || initialAnswer === '' || initialAnswer.toLowerCase() !== "y") {
        console.log('Switching to custom prompts!');
    } else {
        contextHandler("default");
    }


    const locationAnswer = await readInterface.question(questionsStringObj.location);
    console.log('Received:', location);
    if (locationAnswer === undefined || locationAnswer === '') {
        console.log('Using default location:', defaultLocation);
    }

    const quantityAnswer = await readInterface.question(questionsStringObj.quantity);
    console.log('Received:', quantityAnswer);
    if (quantityAnswer === undefined || quantityAnswer === '' || Number.isNaN(Number(quantityAnswer))) {
        console.log('Using default value:', 5);
    }

    const fileExtensionsAnswer = await readInterface.question(questionsStringObj.fileExtensions);
    console.log('Received:', fileExtensionsAnswer);
    if (fileExtensionsAnswer === undefined || fileExtensionsAnswer === '' || Number.isNaN(Number(fileExtensionsAnswer))) {
        console.log('Using default value:', 5);
    }

    const sizesAnswer = await readInterface.question(questionsStringObj.sizes);
    console.log('Received:', sizesAnswer);
    if (sizesAnswer === undefined || sizesAnswer === '' || Number.isNaN(Number(sizesAnswer))) {
        console.log('Using default value:', 5);
    }

};


/* Initiator */
questionsHandler();