import React from "react";
import AuthForm from "../components/auth/AuthForm";
import { useAuthStore } from "../store/authStore";

const Signup: React.FC = () => {
  const { signup, loading, error } = useAuthStore();
   
  return (
    <AuthForm
      mode="signup"
      loading={loading}
      onSubmit={signup}
      error={error}
    />
  );
};

export default Signup;
