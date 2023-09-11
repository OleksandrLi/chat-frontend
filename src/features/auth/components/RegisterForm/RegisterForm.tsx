import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import * as Yup from "yup";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { useAuth } from "../../../../hooks";
import ROUTES from "../../../../routes/constants";

import { PrimaryButton } from "../../../../shared/buttons/styles";
import { PasswordStateLabel, SingUpLabel, Wrapper } from "./styles";
import { Paper } from "../../../../shared/paper/styles";
import CustomFormHelperText from "../../../../shared/components/CustomFormHelperText";

const RegisterForm = () => {
  const { onSignUp } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      message: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required."),
      email: Yup.string()
        .email("Invalid email address.")
        .max(255)
        .required("Email is required."),
      password: Yup.string().max(255).required("Password is required."),
    }),
    onSubmit: (values, { setErrors, setStatus, setSubmitting }) => {
      onSignUp({
        ...values,
        successFn: () => {
          navigate(ROUTES.home);
        },
        errorFn: (error: any) => {
          setStatus({ success: false });
          setSubmitting(false);
          setErrors(error);
        },
      });
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Wrapper>
      <Grid container>
        <Grid xs={1} lg={4} md={2} />
        <Grid xs={10} lg={4} md={8}>
          <Paper
            sx={{
              p: 4,
            }}
          >
            <SingUpLabel variant="h5">Sign Up</SingUpLabel>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputLabel shrink htmlFor="name">
                      Name
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      id="name"
                      placeholder="What should we call you?"
                      name="name"
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={!!(formik.touched.name && formik.errors.name)}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <FormHelperText error id="name">
                        <CustomFormHelperText error={formik.errors.name} />
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel shrink htmlFor="email">
                      Email Address
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      type="email"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={!!(formik.touched.email && formik.errors.email)}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <FormHelperText error id="email">
                        <CustomFormHelperText error={formik.errors.email} />
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel shrink htmlFor="password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={
                        !!(formik.touched.password && formik.errors.password)
                      }
                      endAdornment={
                        <InputAdornment
                          position="end"
                          onClick={handleClickShowPassword}
                          sx={{ cursor: "pointer" }}
                        >
                          <IconButton
                            aria-label="toggle password visibility"
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                          <PasswordStateLabel>
                            {showPassword ? <b>Hide</b> : <b>Show</b>}
                          </PasswordStateLabel>
                        </InputAdornment>
                      }
                      placeholder="Password"
                      name="password"
                    />
                    <FormHelperText>
                      <Typography variant="body2" color="#666666">
                        Minimum 6 character.
                      </Typography>
                    </FormHelperText>
                    {
                      <FormHelperText
                        error={
                          !!(formik.touched.password && formik.errors.password)
                        }
                        id="password"
                      >
                        {formik.touched.password && formik.errors.password && (
                          <CustomFormHelperText
                            error={formik.errors.password}
                          />
                        )}
                      </FormHelperText>
                    }
                  </Grid>
                  {formik.errors.message && (
                    <Grid item xs={12}>
                      <FormHelperText
                        error={!!formik.errors.message}
                        id="message"
                      >
                        {formik.errors.message && (
                          <CustomFormHelperText error={formik.errors.message} />
                        )}
                      </FormHelperText>
                    </Grid>
                  )}
                </Grid>
                <PrimaryButton
                  size="large"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color={"primary"}
                  sx={{
                    mt: 3,
                    mb: 2,
                  }}
                  disabled={
                    formik.isSubmitting || !(formik.isValid && formik.dirty)
                  }
                >
                  Sign up
                </PrimaryButton>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      Already a member? <Link to={ROUTES.login}>Login</Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default RegisterForm;
