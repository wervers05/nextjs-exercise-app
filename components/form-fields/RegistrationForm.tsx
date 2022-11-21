import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  FormControl,
  TextField,
  Button,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { ContainerForm, FormTitle, FormContent } from "../formstyles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

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
  email: string;
  phone: string;
}

export const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [values, setValues] = useState<State>({
    showPassword: false,
    showConfirm: false,
  });
  const router = useRouter();

  const formik = useFormik<Values>({
    initialValues: {
      username: "",
      password: "",
      confirm: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    onSubmit: async (values: Values) => {
      handleClickOpen();

      try {
        await axios.post(
          "https://6371e259025414c637002627.mockapi.io/api/fiddle/users",
          values
        );
      } catch (err) {
        console.log(err.response.data);
      }
      router.replace("/login");
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
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
      email: Yup.string()
        .required("This field is required")
        .email("Must be a valid email"),
      phone: Yup.string()
        .required("This field is required")
        .matches(phoneRules, "Must enter valid phone number")
        .min(11, "11 digit phone number only")
        .max(11, "11 digit phone number only"),
    }),
  });

  const toggleShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const toggleShowConfirm = () => {
    setValues({
      ...values,
      showConfirm: !values.showConfirm,
    });
  };

  return (
    <>
      <ContainerForm>
        <FormTitle>Register</FormTitle>
        <FormContent
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
        >
          {submit && (
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle aria-labelledby="alert-dialog-title">
                {"Message!"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  User successfully registered!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          )}
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
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
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
              helperText={formik.touched.password && formik.errors.password}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
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
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowConfirm}
                      edge="end"
                    >
                      {values.showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

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
              size="small"
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
              size="small"
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
              size="small"
            />
          </FormControl>
          <FormControl margin={"dense"} hiddenLabel={true}>
            <TextField
              required
              id="email"
              label="Email Address"
              type={"email"}
              value={formik.values.email || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              size="small"
            />
          </FormControl>
          <FormControl margin={"dense"} hiddenLabel={true}>
            <TextField
              required
              id="phone"
              label="Mobile Number"
              value={formik.values.phone || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && !!formik.errors.phone}
              helperText={formik.touched.phone && formik.errors.phone}
              size="small"
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
          <Link href="/login">Go back to login</Link>
        </FormContent>
      </ContainerForm>
    </>
  );
};
