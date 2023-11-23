"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useForm,
  FormProvider,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";

const defaultValues = {
  title: "",
};

const RegisterFormPage = () => {
  const regForm = useForm({
    defaultValues,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const onReset = () => {
    regForm.reset(defaultValues);
  };

  return (
    <div className="p-6">
      <FormProvider {...regForm}>
        <form className="flex gap-2" onSubmit={regForm.handleSubmit(onSubmit)}>
          <Controller
            name="title"
            render={({ field }) => (
              <div className="w-[300px]">
                <Input {...field} type="text" />
              </div>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <Button
        type="button"
        className="mt-2"
        variant="secondary"
        onClick={onReset}
      >
        Reset
      </Button>
    </div>
  );
};

export default RegisterFormPage;
