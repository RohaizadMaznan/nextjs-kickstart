"use client"; // [F1] Forms need state and events, so Client Component.

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  registerSchema,
  type RegisterInput,
  type RegisterOutput,
} from "@/lib/schemas/register";

export default function FormDemoPage() {
  // [F2] useForm<FormValues, Context, ValidatedValues>
  const {
    register, //     [F3] Connects an <input> to the form.
    handleSubmit, // [F4] Validates first, calls your function only if valid.
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }, // [F5] Live form state.
  } = useForm<RegisterInput, unknown, RegisterOutput>({
    resolver: zodResolver(registerSchema), // [F6] Zod does the validation. RHF shows the results.
    mode: "onTouched", //                     [F7] Validate a field after the user leaves it.
    defaultValues: {
      name: "",
      email: "",
      age: "",
      role: "student",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });

  // [F8] `data` is already validated and typed (age is a number here, not a string).
  async function onSubmit(data: RegisterOutput) {
    await new Promise((r) => setTimeout(r, 800)); // pretend API call
    console.log("Submitted:", data);
    reset();
  }

  return (
    <main className="mx-auto w-full max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">Register (RHF + Zod)</h1>

      {/* [F9] noValidate turns off browser popups so Zod messages are the only ones. */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        <Field id="name" label="Name" error={errors.name?.message}>
          {/* [F10] Spread register("field"): adds name, onChange, onBlur, ref. */}
          <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
        </Field>

        <Field id="email" label="Email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
        </Field>

        <Field id="age" label="Age" error={errors.age?.message}>
          <Input
            id="age"
            type="number"
            {...register("age")}
            aria-invalid={!!errors.age}
          />
        </Field>

        <Field id="role" label="Role" error={errors.role?.message}>
          {/* [F11] Native <select> works with register too. */}
          <select
            id="role"
            {...register("role")}
            className="h-8 rounded-lg border px-2 text-sm"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </Field>

        <Field id="password" label="Password" error={errors.password?.message}>
          <Input
            id="password"
            type="password"
            {...register("password")}
            aria-invalid={!!errors.password}
          />
        </Field>

        <Field
          id="confirmPassword"
          label="Confirm password"
          error={errors.confirmPassword?.message}
        >
          {/* [F12] This error comes from the object-level refine (Z7/Z8). */}
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
          />
        </Field>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("agree")} /> I accept the terms
        </label>
        {errors.agree && (
          <p className="text-sm text-destructive">{errors.agree.message}</p>
        )}

        {/* [F13] Disable while submitting so users cannot double-submit. */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Register"}
        </Button>
        {isSubmitSuccessful && (
          <p className="text-sm text-green-600">
            Registered! Check the console.
          </p>
        )}
      </form>
    </main>
  );
}

// [F14] Small helper so every field shows its label + error the same way.
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
