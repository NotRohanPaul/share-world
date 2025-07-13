import { z } from "zod";

const nameSchema = z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(21, "Name must not exceed 21 characters")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces")
    .trim();

const emailSchema = z
    .string()
    .min(5, { message: "Email must be at least 5 characters" })
    .max(255, { message: "Email must be at most 255 characters" })
    .email({ message: "Invalid email format" })
    .toLowerCase()
    .trim();

const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .refine(val => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter.",
    })
    .refine(val => /[0-9]/.test(val), {
        message: "Password must contain at least one number.",
    })
    .refine(val => /[^A-Za-z0-9]/.test(val), {
        message: "Password must contain at least one special character.",
    })
    .refine(val => new TextEncoder().encode(val).length <= 72, {
        message: "Password must be at most 72 bytes",
    });



export const userSchema = z.strictObject({
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema,
    emailVerified: z.boolean().optional()
});


export const cookiesSchema = z.strictObject({
    refreshToken: z.string(),
    accessToken: z.string(),
});


export const jwtPayloadSchema = z.object({
    userId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Must be a 24-character hexadecimal string"),
    email: emailSchema,
}).passthrough();
