import { z } from "zod";


export const emailSchema = z.string().email().min(1).max(255);
export const passwordSchema = z.string().min(8).max(255);


export const userSchema = {
    email: emailSchema,
    password: passwordSchema,
    name: z.string().min(2).max(255),
    emailVerified: z.boolean().optional()
};
