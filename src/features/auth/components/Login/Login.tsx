import {
  Box,
  Grid,
  InputLabel,
  Typography,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import CustomFormHelperText from "../../../../shared/components/CustomFormHelperText";
import { useAuth } from "../../../../hooks";
import ROUTES from "../../../../routes/constants";

import { PrimaryButton } from "../../../../shared/buttons/styles";
import { PasswordTitleContainer, SingUpLabel, Wrapper } from "./styles";
import { Paper } from "../../../../shared/paper/styles";

const Login = () => {
  const navigate = useNavigate();

  const { onLogin } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      message: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address.")
        .max(255)
        .required("Email is required."),
      password: Yup.string().max(255).required("Password is required."),
    }),
    onSubmit: (values, { setErrors, setStatus, setSubmitting }) => {
      onLogin({
        data: { ...values },
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
            <SingUpLabel variant="h5">Login</SingUpLabel>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2} paddingBottom="24px">
                  <Grid item xs={12}>
                    <InputLabel shrink htmlFor="email">
                      Email address
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
                    <PasswordTitleContainer>
                      <div>
                        <InputLabel shrink htmlFor="password">
                          Password
                        </InputLabel>
                      </div>
                    </PasswordTitleContainer>
                    <OutlinedInput
                      fullWidth
                      id="password"
                      type="password"
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={
                        !!(formik.touched.password && formik.errors.password)
                      }
                      placeholder="Password"
                      name="password"
                    />
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
                </Grid>
                <PrimaryButton
                  size={"large"}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color={"primary"}
                  disabled={
                    formik.isSubmitting || !(formik.isValid && formik.dirty)
                  }
                >
                  Log in
                </PrimaryButton>
                {
                  <FormHelperText error={!!formik.errors.message} id="password">
                    {formik.errors.message && (
                      <CustomFormHelperText error={formik.errors.message} />
                    )}
                  </FormHelperText>
                }
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      mt: 2,
                    }}
                  >
                    <Typography variant="body2">
                      Not a member? <Link to={ROUTES.signup}>Sign up now</Link>
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

export default Login;
