import { z } from "zod";
import { loginSchema } from "@src/schemas/auth-schemas";

export type LoginSchemaType = z.infer<typeof loginSchema>;
