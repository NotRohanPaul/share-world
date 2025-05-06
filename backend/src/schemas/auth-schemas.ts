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
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces");


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
