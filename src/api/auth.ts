import axios from "../config/axiosConfig";


export async function signupApi(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await axios.post(`/auth/register`, data);
  return res.data;
}

export async function signinApi(data: {
  email: string;
  password: string;
}) {
  const res = await axios.post(`/auth/login`, data);
  return res.data;
}
