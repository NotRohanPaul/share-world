import { userSchema } from "@src/schemas/auth-schemas";
import bcrypt from "bcryptjs";

export const createPasswordHash = async (password: string): Promise<string | null> => {
    const parsedPassword = await userSchema.shape.password.spa(password);
    if (parsedPassword.success !== true)
        return null;

    return await bcrypt.hash(password, 12);
};

export const comparePasswordHash = async (password: string, hash: string): Promise<boolean> => {
    const parsedPassword = await userSchema.shape.password.spa(password);
    if (parsedPassword.success !== true)
        return false;

    return await bcrypt.compare(password, hash);
};