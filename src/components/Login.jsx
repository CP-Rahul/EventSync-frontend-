import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../constants";
import validateAuth from "../utils/validate";
import toast from "react-hot-toast";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setloading(true);
    const user = validateAuth(email.current.value, password.current.value);
    if (!user) {
      setloading(false);
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/user/login`, user);
      const token = response?.data?.data;
      if (response.status === 200) {
        if (localStorage.getItem("x-access-token")) {
          localStorage.removeItem("x-access-token");
        }
        localStorage.setItem("x-access-token", token);
        toast.success(response.data?.data?.msg || "Login successful");
        setloading(false);
        navigate("/");
      }
      setloading(false);
    } catch (error) {
      toast.error(
        error.response?.data?.error?.explanation ||
          "Something went wrong while login"
      );
      setloading(false);
    }
  };
  return (
    <div className="flex justify-center h-screen items-center">
      <form
        className="flex flex-col gap-5 border p-8 border-black rounded"
        onSubmit={loginHandler}
      >
        <h1 className="text-lg text-center">Login</h1>
        <input
          ref={email}
          type="email"
          placeholder="email"
          required
          className="focus:outline-none border border-black rounded p-2"
        />
        <input
          ref={password}
          type="password"
          required
          placeholder="password"
          className="focus:outline-none border border-black rounded p-2"
        />
        <button
          className={`p-2 rounded text-center ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-500"
          } text-white`}
          type="submit"
          disabled={loading}
        >
          Login
        </button>
        <Link to={"/register"} className="underline" disabled={loading}>
          Do not have an account?
        </Link>
      </form>
    </div>
  );
};

export default Login;
