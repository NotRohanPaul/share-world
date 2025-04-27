import { z } from "zod";

const emailSchema = z
    .string()
    .min(5, { message: "Email must be at least 5 characters" })
    .max(255, { message: "Email must be at most 255 characters" })
    .email({ message: "Invalid email format" });

const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .refine(val => new TextEncoder().encode(val).length <= 72, {
        message: "Password must be at most 72 bytes",
    });


const nameSchema = z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(255, { message: "Name must be at most 255 characters" })
    .regex(/^[A-Za-z]+$/, { message: "Name must contain only alphabets" });


export const userSchema = {
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema,
    emailVerified: z.boolean().optional()
};


export const cookiesSchema = z.object({
    refreshToken: z.string().optional(),
    accessToken: z.string().optional(),
});
