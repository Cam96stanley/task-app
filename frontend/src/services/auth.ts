import axios from "axios";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const signupUser = async (data: SignupData) => {
  const response = await axios.post("http://localhost:5000/users", data, {
    withCredentials: true,
  });
  console.log(response.data);
  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await axios.post("http://localhost:5000/users/login", data, {
    withCredentials: true,
  });
  const { token, user } = response.data;
  localStorage.setItem("token", token);
  console.log(token);
  return user;
};
