import { z } from "zod";
import { loginSchema } from "@src/schemas/authSchemas";

export type LoginSchemaType = z.infer<typeof loginSchema>;
