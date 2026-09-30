"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { wizard1Schemas, WizardForm1 } from "../schemas/wizard-schemas";

type Props = {
  setWizard: React.Dispatch<React.SetStateAction<number>>;
};

export default function WizardForm1({ setWizard }: Props) {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(wizard1Schemas),
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
    },
  });

  const onSubmit = (data: WizardForm1) => {
    return data.fullname;
  };

  const onNext = () => {
    setWizard(2);
  };

  return (
    <div>
      <p className="font-mono text-lg">Form 1</p>
      <div>
        <FieldSet>
          <FieldLegend>Profile</FieldLegend>
          <FieldDescription>
            This appears on invoices and emails.
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input
                id="fullname"
                autoComplete="off"
                placeholder="Evil Rabbit"
                {...register("fullname")}
              />
              <FieldDescription>
                This appears on invoices and emails.
              </FieldDescription>
              <FieldError>{errors.fullname?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                autoComplete="off"
                {...register("username")}
              />
              <FieldError>{errors.username?.message}</FieldError>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
      <Button
        type="submit"
        variant="outline"
        disabled={!isDirty || !isValid}
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  );
}
