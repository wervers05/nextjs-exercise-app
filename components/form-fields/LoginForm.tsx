import React, { useState } from "react";
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
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import PersonIcon from "@mui/icons-material/Person";
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
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
      const getRes = await axios
        .get("https://6371e259025414c637002627.mockapi.io/api/fiddle/users")
        .then();
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
        setSubmit(true);
        handleClickOpen();
      } else {
        await axios.post("/api/login", values);
        setLoading(true);
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
          {submit && (
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle aria-labelledby="alert-dialog-title">
                {"Error!"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  User doesn't exist.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          )}
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
          <LoadingButton
            variant="contained"
            loading={loading}
            loadingIndicator={<CircularProgress />}
            sx={{
              marginTop: 1,
              marginBottom: 3,
              color: "white",
              background: "black",
            }}
            type="submit"
          >
            Login
          </LoadingButton>
          <Link href={"/register"}>Click here to register</Link>
        </FormContent>
      </ContainerForm>
    </>
  );
};
