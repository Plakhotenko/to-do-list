import { FC } from "react";
import { Button } from "@mui/material";
import * as yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { Input } from "./Input";

const validationSchema = yup.object().shape({
  name: yup.string().label("Task name").min(5).max(20).required(),
  description: yup
    .string()
    .label("Task description")
    .min(15)
    .max(340)
    .required(),
});

type FormikSubmitHandler = (
  values: { name: string; description: string },
  formikHelpers: FormikHelpers<{ name: string; description: string }>
) => void | (Promise<any> & Function);

export const CreateTaskForm: FC<{
  onTaskCreate: FormikSubmitHandler;
}> = ({ onTaskCreate }) => (
  <Formik
    initialValues={{ name: "", description: "" }}
    onSubmit={onTaskCreate}
    validationSchema={validationSchema}
  >
    <Form className="main-form">
      <Input name="name" label="New task name" />
      <Input name="description" label="Task description" multiline={true} />
      <Button variant="contained" type="submit">
        Create
      </Button>
    </Form>
  </Formik>
);
