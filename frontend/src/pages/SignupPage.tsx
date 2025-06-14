/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SignupForm from "../components/SignupForm";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };
  return (
    <div>
      <SignupForm
        formData={formData}
        onChange={handChange}
        onSubmit={handleSubmit}
        error={error}
      />
    </div>
  );
}
