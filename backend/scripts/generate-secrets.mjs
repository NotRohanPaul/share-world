import crypto from "node:crypto";
console.log("Secret:", crypto.randomBytes(64).toString("hex"));
