import readline from "node:readline";
import crypto from "node:crypto";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter a number: ", (input) => {
    console.log("Input Received", input);

    const number = Number(input);

    if (
        Number.isSafeInteger(number) === false ||
        number <= 0 ||
        input.includes('.') ||
        input.toLowerCase().includes('e')
    ) {
        console.log("Invalid input! Enter a positive whole number only.");
        rl.close();
        return;
    }

    console.log("Secret:", crypto.randomBytes(number).toString("hex"));
    rl.close();
})

