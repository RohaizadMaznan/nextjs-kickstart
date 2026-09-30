import { z } from "zod";

// [Z1] A schema describes the shape AND the rules of the data.
export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"), // [Z2] Chain rules; last arg = error message.
    email: z.email("Enter a valid email"), //                                [Z3] Built-in format validators.
    age: z.coerce.number<string>().int().min(18, "You must be 18 or older"), // [Z4] <input> gives strings; coerce turns "20" into 20.
    role: z.enum(["student", "teacher"], { message: "Pick a role" }), //   [Z5] Only these values are allowed.
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    agree: z.boolean().refine((v) => v, "You must accept the terms"), //  [Z6] refine = custom rule for one field.
  })
  // [Z7] refine on the whole object = rules that compare fields.
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // [Z8] Attach the error to this field so the form shows it there.
  });

// [Z9] Derive TypeScript types from the schema. One source of truth, no duplicate interface.
export type RegisterInput = z.input<typeof registerSchema>; //  what the form holds (age is a string)
export type RegisterOutput = z.output<typeof registerSchema>; // what you get after validation (age is a number)
