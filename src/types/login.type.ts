import { loginSchema } from "@/schemas/registerlogin";
import z from "zod";

export type loginType = z.infer<typeof loginSchema>