import { z } from "zod";

const emailSchema = z.string().email().min(1).max(255);
const passwordSchema = z.string().min(8).max(255);
const nameSchema = z.string().min(2).max(255).regex(/^[A-Za-z]+$/, "Name must contain only alphabets");


export const userSchema = {
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema,
    emailVerified: z.boolean().optional()
};
