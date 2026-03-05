import z from "zod";

export const checkOut = z.object({
  city: z
    .string()
    .nonempty("City is required")
    .min(2, "City must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "City must contain letters only"),
  phone: z
    .string()
    .nonempty("Phone is required")
    .regex(/^[0-9]+$/, "Phone must contain numbers only")
    .min(6, "Phone must be at least 6 numbers")
    .max(15, "Phone is too long"),
  details: z
    .string()
    .nonempty("Details are required")
    .min(10, "Details must be at least 10 characters")
    .max(200, "Details is too long"),
  type: z.enum(["cash", "online"]),
});
