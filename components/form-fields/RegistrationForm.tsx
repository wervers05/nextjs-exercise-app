import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik, FormikProps } from "formik";
import {
  FormControl,
  TextField,
  Button,
  InputAdornment,
  FormGroup,
} from "@mui/material";
import { FormMain, FormTitle, FormContent } from "../sharedstyles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const passwordMessage =
  "Must contain at least 1 uppercase, a lowercase, a special character and a number";
const phoneRules =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

interface State {
  showPassword: boolean;
  showConfirm: boolean;
}

interface Values {
  username: string;
  password: string;
  confirm: string;
  firstName: string;
  middleName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: string;
}

export const RegistrationForm = () => {
  const [values, setValues] = useState<State>({
    showPassword: false,
    showConfirm: false,
  });

  const formik = useFormik<Values>({
    initialValues: {
      username: "",
      password: "",
      confirm: "",
      firstName: "",
      middleName: "",
      lastName: "",
      emailAddress: "",
      mobileNumber: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("This field is required")
        .min(4, "Username must not be less than 4 characters")
        .max(10, "Username must not exceed 10 characters"),
      password: Yup.string()
        .required("No password provided")
        .min(6, "Password must not be less than 6 characters")
        .max(15, "Password must not exceed 15 characters")
        .matches(passwordRules, passwordMessage),
      confirm: Yup.string()
        .required("This field is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      firstName: Yup.string()
        .required("This field is required")
        .matches(/[a-zA-Z]/, "Must contain only letters"),
      middleName: Yup.string().matches(/[a-zA-Z]/, "Must contain only letters"),
      lastName: Yup.string()
        .required("This field is required")
        .matches(/[a-zA-Z]/, "Must contain only letters"),
      emailAddress: Yup.string()
        .required("This field is required")
        .email("Must be a valid email"),
      mobileNumber: Yup.string()
        .required("This field is required")
        .matches(phoneRules, "Must enter valid phone number")
        .min(11, "11 digit phone number only")
        .max(11, "11 digit phone number only"),
    }),
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowConfirm = () => {
    setValues({
      ...values,
      showConfirm: !values.showConfirm,
    });
  };

  return (
    <>
      <FormMain>
        <FormTitle>Register</FormTitle>
        <FormContent
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
        >
          <FormControl margin={"dense"} hiddenLabel={true}>
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
          <FormGroup
            sx={{
              marginLeft: 0,
              marginRight: 0,
              // display: "flex",
              // flexWrap: "wrap",
              "& .MuiTextField-root": { width: "350px" },
            }}
          >
            <FormControl margin={"dense"} hiddenLabel={true}>
              <TextField
                required
                id="password"
                label="Password"
                type={values.showPassword ? "text" : "password"}
                value={formik.values.password || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.username && formik.errors.username}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl margin={"dense"} hiddenLabel={true}>
              <TextField
                required
                id="confirm"
                label="Confirm Password"
                type={values.showConfirm ? "text" : "password"}
                value={formik.values.confirm || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirm && !!formik.errors.confirm}
                helperText={formik.touched.confirm && formik.errors.confirm}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirm}
                        edge="end"
                      >
                        {values.showConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </FormGroup>
          <FormControl margin={"dense"} hiddenLabel={true}>
            <TextField
              required
              id="firstName"
              label="First Name"
              value={formik.values.firstName || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && !!formik.errors.firstName}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </FormControl>
          <FormControl margin={"dense"} hiddenLabel={true}>
            <TextField
              id="middleName"
              label="Middle Name"
              value={formik.values.middleName || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.middleName && !!formik.errors.middleName}
              helperText={formik.touched.middleName && formik.errors.middleName}
            />
          </FormControl>
          <FormControl margin={"dense"} hiddenLabel={true}>
            <TextField
              required
              id="lastName"
              label="Last Name"
              value={formik.values.lastName || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && !!formik.errors.lastName}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </FormControl>
          <FormControl margin={"dense"} hiddenLabel={true}>
            <TextField
              required
              id="emailAddress"
              label="Email Address"
              type={"email"}
              value={formik.values.emailAddress || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.emailAddress && !!formik.errors.emailAddress
              }
              helperText={
                formik.touched.emailAddress && formik.errors.emailAddress
              }
            />
          </FormControl>
          <FormControl margin={"dense"} hiddenLabel={true}>
            <TextField
              required
              id="mobileNumber"
              label="Mobile Number"
              value={formik.values.mobileNumber || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.mobileNumber && !!formik.errors.mobileNumber
              }
              helperText={
                formik.touched.mobileNumber && formik.errors.mobileNumber
              }
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
            Submit
          </Button>
        </FormContent>
      </FormMain>
    </>
  );
};
