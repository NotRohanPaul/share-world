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

const extensionsMultiplierObj = {
    B: 1024 ** 0,
    K: 1024 ** 1,
    M: 1024 ** 2,
    G: 1024 ** 3,
    P: 1024 ** 4,
};
const defaultAnswers = {
    defaultLocation: path.join(os.homedir(), 'Downloads', "sample-files"),
    defaultQuantity: 5,
    defaultFileExtensions: "txt,md,html,pdf,png",
    defaultSizes: "1B,1K,1M,2B,2K,3M",
};

const customAnswers = defaultAnswers;

/* Questions */
const questionsStringObj = {
    initial: `Defaults:
    Location: ${defaultAnswers.defaultLocation}
    Files Quantity: ${defaultAnswers.defaultQuantity}
    Files Extensions: ${defaultAnswers.defaultFileExtensions}
    Files Sizes: ${defaultAnswers.defaultSizes} 
Do you want automatic creation of files with default input? (y/n): `,
    location: `What's the location of the files creation? (Defaults to ${defaultAnswers.defaultLocation}): `,
    quantity: `How many files you require? (Defaults to ${defaultAnswers.defaultQuantity}): `,
    fileExtensions: `Enter the files extensions? (Defaults to these ${defaultAnswers.defaultFileExtensions}): `,
    sizes: `Enter the sizes of the files? (Defaults to these ${defaultAnswers.defaultSizes}): `,
};

/* Utility */

/* Split the string into an array then trim the spaces then remove possible dot user may input*/
const extractFilesExtensions = (validString) => {
    return validString
        .split(',')
        .map(ext => {
            let modifiedExt = ext.trim();
            if (modifiedExt[0] === '.') {
                modifiedExt = modifiedExt.slice(1);
            }
            return modifiedExt;
        });
};

/* Split the string into an array then trim the spaces then changes then covert the units to bytes*/
const extractSizes = (validString) => {
    return validString
        .split(',')
        .map(size => {
            let modifiedSize = size.trim();
            const unit = modifiedSize.at(-1);
            modifiedSize = Number(modifiedSize) * extensionsMultiplierObj[unit];
            return modifiedSize;
        });
};

const validateFileExtensions = () => { };
const validateFileSizes = () => { };


/* Handlers */
const defaultAnswersFilesHandler = async () => {
    try {
        await fs.promises.access(defaultAnswers.defaultLocation, fs.constants.W_OK | fs.constants.R_OK);
        console.log(`Folder: ${defaultAnswers.defaultLocation} is accessible`);
        await fs.promises.mkdir(defaultAnswers.defaultLocation);
        console.log(`Additional Required Folders is created`);
    }
    catch (err) {
        console.log(`Folder: ${defaultAnswers.defaultLocation} is NOT accessible may be its not present or the OS or AntiMalware is blocking the script from accessing it.`);
        throw err;
    };

    const filesExtension = extractFilesExtensions(defaultAnswers.defaultFileExtensions);
    const filesSizes = extractSizes(defaultAnswers.defaultSizes);
    for (let fileCount = 0; fileCount < defaultAnswers.defaultQuantity; fileCount++) {
        await fs.promises.writeFile(`sample-file-${(new Date).toISOString()}.${filesExtension[fileCount]}`, new Buffer(filesSizes[fileCount], [0x00]));
    }


};
const customAnswersFilesHandler = () => {

};

const contextHandler = (context) => {
    if (context !== "default" && context !== "custom")
        throw new Error(`Wrong context: ${context}`);

    if (context === "default") {
        defaultAnswersFilesHandler();
    }
    else {
        customAnswersFilesHandler();
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
    console.log('Received:', locationAnswer);
    if (locationAnswer === undefined || locationAnswer === '') {
        console.log('Using default location:', defaultAnswers.defaultLocation);
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