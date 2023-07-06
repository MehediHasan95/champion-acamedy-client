import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "https://b7a12-summer-camp-server-side-mehedi-hasan95.vercel.app",
});

function useAxiosSecure() {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = token;
      }
      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOut().then(() => navigate("/auth"));
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);
  return [instance];
}

export default useAxiosSecure;
