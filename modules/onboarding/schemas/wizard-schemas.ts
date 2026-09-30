import z from "zod";

const wizard1Schemas = z.object({
  fullname: z.string().trim().min(2, "Full name must be at least 2 characters"), // [Z2] Chain rules; last arg = error message.
  username: z.email("Should an email format."), //                                [Z3] Built-in format validators.
});

const wizard2Schemas = z.object({
  age: z.coerce.number<string>().int().min(18, "You must be 18 or older"), // [Z4] <input> gives strings; coerce turns "20" into 20.
  role: z.enum(["student", "teacher"], { message: "Pick a role" }), //   [Z5] Only these values are allowed.
});

const wizard3Schemas = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    agree: z.boolean().refine((v) => v, "You must accept the terms"), //  [Z6] refine = custom rule for one field.
  })
  // [Z7] refine on the whole object = rules that compare fields.
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // [Z8] Attach the error to this field so the form shows it there.
  });

export type WizardForm1 = z.input<typeof wizard1Schemas>;
export type WizardForm2 = z.input<typeof wizard2Schemas>;
export type WizardForm3 = z.input<typeof wizard3Schemas>;

export { wizard1Schemas, wizard2Schemas, wizard3Schemas };
