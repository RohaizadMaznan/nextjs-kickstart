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
import WizardForm1 from "@/modules/onboarding/components/wizard-form-1";
import { wizard1Schemas } from "@/modules/onboarding/schemas/wizard-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

export default function Page({}: Props) {
  const [wizard, setWizard] = React.useState<number>(1);

  const renderPage = (formNumber: number) => {
    switch (formNumber) {
      case 1:
        return <WizardForm1 setWizard={setWizard} />;

      case 2:
        return (
          <div>
            <p>Form 2</p>
            <Button variant="outline" onClick={() => setWizard(1)}>
              Prev
            </Button>
            <Button variant="outline" onClick={() => setWizard(3)}>
              Next
            </Button>
          </div>
        );

      case 3:
        return (
          <div>
            <p>Form 3</p>
            <Button variant="outline" onClick={() => setWizard(2)}>
              Prev
            </Button>
            <Button variant="outline">Submit</Button>
          </div>
        );

      default:
        break;
    }
  };

  return (
    <div className="flex justify-center mx-auto">
      <form className="bg-gray-100 border shadow p-4 h-fit rounded-lg mt-8">
        {renderPage(wizard)}
      </form>
    </div>
  );
}

// Page render
// read setter
// found wizard is number, 1
// this page render a component called 'renderPage' with props wizard
// wizard is formNumber
// formNumber containing 1 from setter - wizard
// inside renderPage component has switch
// check switch case match the wizard number
// found number 1
// render content in case 1
