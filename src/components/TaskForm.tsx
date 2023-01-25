import React, { FC } from "react";
import { Button } from "@mui/material";
import * as yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { Input } from "../Input";
import { ITask } from "./Task";

const validationSchema = yup.object().shape({
  name: yup.string().label("Task name").min(5).max(20).required(),
  description: yup
    .string()
    .label("Task description")
    .min(15)
    .max(340)
    .required(),
});

export type FormikSubmitHandler = (
  values: Pick<ITask, "name" | "description">,
  formikHelpers: FormikHelpers<{ name: string; description: string }>
) => void | (Promise<any> & Function);

export const TaskForm: FC<{
  handleSubmit: FormikSubmitHandler;
  submitText?: string;
  initialValues?: ITask;
}> = ({ handleSubmit, submitText = "Create", initialValues }) => (
  <Formik
    initialValues={{
      name: initialValues?.name || "",
      description: initialValues?.description || "",
    }}
    onSubmit={handleSubmit}
    validationSchema={validationSchema}
  >
    <Form className="main-form">
      <Input name="name" label="Task name" />
      <Input name="description" label="Task description" multiline={true} />
      <Button variant="contained" type="submit">
        {submitText}
      </Button>
    </Form>
  </Formik>
);
