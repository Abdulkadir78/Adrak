import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { login } from "../../store/auth/side-effects";
import { authActions } from "../../store/auth/auth-slice";
import ProgressAbsolute from "../Shared/Loaders/ProgressAbsolute";
import useLocationChange from "../../hooks/useLocationChange";
import useAuthSelector from "../../hooks/selectors/useAuthSelector";
import loginSchema from "../../validation-schemas/login";
import StyledLink from "../Shared/StyledLink";
import PaperContainer from "./PaperContainer";
import Error from "../Shared/Alerts/Error";
import Snack from "../Shared/Alerts/Snack";
import CheckBox from "../Shared/CheckBox";
import Input from "../Shared/Input";
import Brand from "../Shared/Brand";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, message } = useAuthSelector();
  const dispatch = useDispatch();

  const action = useCallback(() => {
    error && dispatch(authActions.resetError());
  }, [dispatch, error]);

  useLocationChange(action);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSnackClose = () => {
    dispatch(authActions.resetMessage());
  };

  return (
    <PaperContainer>
      {loading && <ProgressAbsolute />}

      {message && (
        <Snack
          severity="success"
          message={message}
          handleClose={handleSnackClose}
        />
      )}

      <Brand />
      <Typography mt={1} mb={4}>
        Sign In
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <Error error={error} />}

        <Input
          fullWidth
          type="text"
          label="email"
          register={register}
          errors={errors}
          rules={loginSchema.email}
          disabled={loading}
          // autoFocus
        />

        <Input
          fullWidth
          type={showPassword ? "text" : "password"}
          label="password"
          register={register}
          errors={errors}
          rules={loginSchema.password}
          disabled={loading}
          halfMargin
        />

        <CheckBox
          label="Show Password"
          checked={showPassword}
          onChange={toggleShowPassword}
          disabled={loading}
        />

        <Box textAlign="center" mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            disabled={loading}
          >
            Sign in
          </Button>
        </Box>
      </form>

      <Box mt={3} mr={2} display="flex">
        <Typography mr={0.5}>Don't have an account?</Typography>

        <StyledLink
          to="/signup"
          style={{ pointerEvents: loading ? "none" : "auto" }}
        >
          <Typography color="primary">Signup</Typography>
        </StyledLink>
      </Box>
    </PaperContainer>
  );
}

export default LoginForm;
