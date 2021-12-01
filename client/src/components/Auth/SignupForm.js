import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { signup } from "../../store/auth/side-effects";
import { authActions } from "../../store/auth/auth-slice";
import useLocationChange from "../../hooks/useLocationChange";
import useAuthSelector from "../../hooks/selectors/useAuthSelector";
import signupSchema from "../../validation-schemas/signup";
import ProgressAbsolute from "../Shared/Loaders/ProgressAbsolute";
import StyledLink from "../Shared/StyledLink";
import PaperContainer from "./PaperContainer";
import Error from "../Shared/Alerts/Error";
import CheckBox from "../Shared/CheckBox";
import Input from "../Shared/Input";
import Brand from "../Shared/Brand";

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useAuthSelector();
  const dispatch = useDispatch();
  const history = useHistory();

  const action = useCallback(() => {
    error && dispatch(authActions.resetError());
  }, [dispatch, error]);

  useLocationChange(action);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    const {
      username,
      email,
      password,
      "confirm password": confirm_password,
    } = data;

    const details = {
      username,
      email,
      password,
      confirm_password,
    };

    dispatch(signup(details))
      .unwrap()
      .then(
        () => {
          history.push("/login");
        },
        () => {}
      );
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <PaperContainer>
      {loading && <ProgressAbsolute />}

      <Brand />
      <Typography mt={1} mb={4}>
        Create an account
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <Error error={error} />}

        <Input
          fullWidth
          type="text"
          label="username"
          register={register}
          errors={errors}
          rules={signupSchema.username}
          disabled={loading}
          autoFocus
        />

        <Input
          fullWidth
          type="text"
          label="email"
          register={register}
          errors={errors}
          rules={signupSchema.email}
          disabled={loading}
        />

        <Input
          fullWidth
          type={showPassword ? "text" : "password"}
          label="password"
          register={register}
          errors={errors}
          rules={signupSchema.password}
          disabled={loading}
        />

        <Input
          fullWidth
          type={showPassword ? "text" : "password"}
          label="confirm password"
          register={register}
          errors={errors}
          rules={signupSchema.confirmPassword}
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
            Sign up
          </Button>
        </Box>
      </form>

      <Box mt={3} mr={2} display="flex">
        <Typography mr={0.5}>Have an account?</Typography>

        <StyledLink
          to="/login"
          style={{ pointerEvents: loading ? "none" : "auto" }}
        >
          <Typography color="primary">Sign In</Typography>
        </StyledLink>
      </Box>
    </PaperContainer>
  );
}

export default SignupForm;
