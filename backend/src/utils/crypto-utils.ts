import crypto from "node:crypto";

const algorithm = "aes-256-cbc";

export const encrypt = (value: string, secret: string): string => {
    const iv = crypto.randomBytes(16);
    const key = crypto.createHash('sha256').update(secret).digest();
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(value, "utf8", "base64");
    encrypted += cipher.final("base64");
    const result = iv.toString("base64") + ':' + encrypted;
    return result;
};

export const decrypt = (encryptedValue: string, secret: string): string => {
    const [ivBase64, encryptedData] = encryptedValue.split(':');
    const iv = Buffer.from(ivBase64, "base64");
    const key = crypto.createHash("sha256").update(secret).digest();
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};
