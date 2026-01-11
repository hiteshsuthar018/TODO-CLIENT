import React from "react";
import AuthForm from "../components/auth/AuthForm";
import { useAuthStore } from "../store/authStore";
const Signin: React.FC = () => {
const { signin, loading, error } = useAuthStore();

  return (
    <AuthForm
      mode="signin"
      loading={loading}
      onSubmit={signin}
      error={error}
    />
  );
};

export default Signin;