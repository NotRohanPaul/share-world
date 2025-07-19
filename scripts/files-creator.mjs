#!/usr/bin/env node

/* 
    This script allows creation of sample files that can be used to test the sharing feature. 
    If you do not pass any destination directory, the default location of file creation will be user's downloads folder, which is ideal for testing.
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
};
const defaultAnswers = {
    location: path.join(os.homedir(), "Downloads", "sample-files"),
    quantity: 5,
    fileExtensions: "txt,md,html,pdf,png",
    sizes: "1B,1K,1M,500K,50M",
};

const customAnswers = {
    location: defaultAnswers.location,
    quantity: defaultAnswers.quantity,
    fileExtensions: defaultAnswers.fileExtensions,
    sizes: defaultAnswers.sizes,
};

/* Questions */

const questionsStringObj = {
    initial: `Defaults:
    Location: ${defaultAnswers.location}
    Files Quantity: ${defaultAnswers.quantity}
    Files Extensions: ${defaultAnswers.fileExtensions}
    Files Sizes: ${defaultAnswers.sizes} 
Do you want automatic creation of files with default input? (y/n): `,
    location: `What's the location of the files creation? (Defaults to ${defaultAnswers.location}): `,
    quantity: `How many files you require? (Defaults to ${defaultAnswers.quantity}): `,
    fileExtensions: `Enter the files extensions? (Defaults to these ${defaultAnswers.fileExtensions}): `,
    sizes: `Enter the sizes of the files? (Defaults to these ${defaultAnswers.sizes}): `,
};

/* Utilities */

// Split the string into an array then trim the spaces then remove possible dot user may input 
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

// Split the string into an array then trim the spaces then changes then covert the units to bytes
const extractSizes = (validString) => {
    return validString
        .split(',')
        .map(size => {
            size = size.trim();
            const unit = size.at(-1).toUpperCase();
            const value = parseFloat(size.slice(0, -1));
            const multiplier = extensionsMultiplierObj[unit] ?? 1;
            return value * multiplier;
        });
};

/* Handlers */

//File handlers
const defaultAnswersFilesHandler = async () => {
    try {
        await fs.promises.access(defaultAnswers.location, fs.constants.W_OK | fs.constants.R_OK);
        console.log(`Folder: ${defaultAnswers.location} is accessible`);
    }
    catch (err) {
        try {
            await fs.promises.mkdir(defaultAnswers.location);
            console.log(`Additional Required Folders is created`);
        }
        catch (err) {
            console.log(`Folder: ${defaultAnswers.location} is NOT accessible may be its not present or the OS or AntiMalware is blocking the script from accessing it.`);
            throw err;
        }
    };

    const filesExtension = extractFilesExtensions(defaultAnswers.fileExtensions);
    const filesSizes = extractSizes(defaultAnswers.sizes);
    for (let fileCount = 0; fileCount < defaultAnswers.quantity; fileCount++) {
        const timestamp = new Date().toISOString().replace(/[:]/g, '-');
        const fileName = `sample-file-${fileCount}-${timestamp}.${filesExtension[fileCount % filesExtension.length]}`;

        const filePath = path.join(defaultAnswers.location, fileName);
        await fs.promises.writeFile(filePath, Buffer.alloc(filesSizes[fileCount % filesSizes.length]));
    }
};

const customAnswersFilesHandler = async () => {
    try {
        if (path.isAbsolute(customAnswers.location) === false) {
            customAnswers.location = path.resolve(import.meta.dirname, customAnswers.location);
        }
        await fs.promises.access(customAnswers.location, fs.constants.W_OK | fs.constants.R_OK);
        console.log(`Folder: ${customAnswers.location} is accessible`);

        const sampleFilesPath = path.join(customAnswers.location, "sample-files");
        try {

            await fs.promises.access(sampleFilesPath, fs.constants.W_OK | fs.constants.R_OK);
            console.log(`Folder: ${sampleFilesPath} is accessible`);
        }
        catch (err) {
            await fs.promises.mkdir(sampleFilesPath);
            console.log(`Additional Required Folders is created`);
            throw err;
        }

        const filesExtension = extractFilesExtensions(customAnswers.fileExtensions);
        const filesSizes = extractSizes(customAnswers.sizes);

        if (filesExtension.length !== customAnswers.quantity) {
            console.log("File Extensions do no match with the quantity using defaults");
        }
        if (filesSizes.length !== customAnswers.quantity) {
            console.log("File Sizes do no match with the quantity using defaults");
        }

        for (let fileCount = 0; fileCount < customAnswers.quantity; fileCount++) {
            const timestamp = new Date().toISOString().replace(/[:]/g, '-');
            const fileName = `sample-file-${fileCount}-${timestamp}.${filesExtension[fileCount % filesExtension.length]}`;

            const filePath = path.join(sampleFilesPath, fileName);
            await fs.promises.writeFile(filePath, Buffer.alloc(filesSizes[fileCount % filesSizes.length]));
        }
    }
    catch (err) {
        console.log(`Folder: ${customAnswers.location} is NOT accessible. May be its not present or the OS or AntiMalware Software is blocking the script from accessing it.`);
        throw err;
    };

};

//Questions handlers
const askQuestion = async (questionString, defaultValue, transform) => {
    if (questionString === undefined)
        throw new Error("No question string");
    if (transform !== undefined && typeof transform !== "function")
        throw new Error("Transform argument is not a function");

    const answer = await readInterface.question(questionString);
    console.log("Received:", answer);
    if (answer === undefined || answer.trim() === '') {
        if (defaultValue === undefined) {
            throw new Error("Invalid input");
        }
        console.log("Using default value:", defaultValue);
        return defaultValue;
    }
    else {
        const trimmedAnswer = answer.trim();
        if (transform !== undefined)
            return transform(trimmedAnswer);

        return trimmedAnswer;
    }
};

const questionsHandler = async () => {
    const initialAnswer = await askQuestion(questionsStringObj.initial, 'n', (s) => s.toLowerCase());

    if (initialAnswer !== "y") {
        console.log("Switching to custom prompts!");
    } else {
        await defaultAnswersFilesHandler();
        console.log("Done");
        process.exit(0);
    }

    // Questions for custom inputs
    customAnswers.location = await askQuestion(questionsStringObj.location, defaultAnswers.location);
    customAnswers.quantity = await askQuestion(questionsStringObj.quantity, defaultAnswers.quantity, Number);
    customAnswers.fileExtensions = await askQuestion(questionsStringObj.fileExtensions, defaultAnswers.fileExtensions, (s) => s.toLowerCase());
    customAnswers.sizes = await askQuestion(questionsStringObj.sizes, defaultAnswers.sizes, (s) => s.toUpperCase());

    await customAnswersFilesHandler();
    console.log("Done");
    process.exit(0);
};


/* Initiator */
questionsHandler();