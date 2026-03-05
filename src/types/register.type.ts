import { registerSchema } from "@/schemas/registerlogin";
import z from "zod";

export type RegisterType = z.infer<typeof registerSchema>;
