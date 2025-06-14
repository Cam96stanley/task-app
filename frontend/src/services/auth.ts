import axios from "axios";

interface SignupData {
  name: string;
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
