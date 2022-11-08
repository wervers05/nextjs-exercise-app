import React from "react";
import { useFormik } from "formik";

interface Values {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const formik = useFormik<Values>({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return <div>Login Form</div>;
};
