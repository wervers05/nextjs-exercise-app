import React, { useState } from "react";
import { useFormik } from "formik";
import { FormControl, TextField, Button, InputAdornment } from "@mui/material";
import { ContainerForm, FormTitle, FormContent } from "../formstyles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

interface Inputs {
  username: string;
  password: string;
}
interface Toggle {
  showPassword: boolean;
}

export const LoginForm = () => {
  const router = useRouter();
  const [value, setValue] = useState<Toggle>({
    showPassword: false,
  });

  const formik = useFormik<Inputs>({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values: Inputs) => {
      const getRes = await axios.get(
        "https://6371e259025414c637002627.mockapi.io/api/fiddle/users"
      );
      const data = getRes.data;
      const result = data.filter((user) => {
        if (
          user.username === values.username &&
          user.password === values.password
        ) {
          return user;
        }
      });

      if (result.length === 0) {
        console.log("User does not exist");
      } else {
        await axios.post("/api/login", values);
        router.replace("/profile");
      }
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
  });

  const toggleShowPassword = () => {
    setValue({
      ...value,
      showPassword: !value.showPassword,
    });
  };

  return (
    <>
      <ContainerForm>
        <FormTitle>Login</FormTitle>
        <FormContent
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
        >
          <FormControl margin={"dense"}>
            <TextField
              required
              id="username"
              label="Username"
              value={formik.values.username || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && !!formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
            />
          </FormControl>
          <FormControl margin={"dense"} hiddenLabel={true}>
            <TextField
              required
              id="password"
              label="Password"
              type={value.showPassword ? "text" : "password"}
              value={formik.values.password || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      edge="end"
                    >
                      {value.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Button
            variant="contained"
            sx={{
              marginTop: 1,
              marginBottom: 3,
              color: "white",
              background: "black",
            }}
            type="submit"
          >
            Login
          </Button>
          <Link href={"/register"}>Click here to register</Link>
        </FormContent>
      </ContainerForm>
    </>
  );
};
