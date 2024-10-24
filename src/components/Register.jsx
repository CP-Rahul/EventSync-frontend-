import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../constants";
import validateAuth from "../utils/validate";
import toast from "react-hot-toast";

const Register = () => {
  const email = useRef(null);
  const password = useRef(null);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    setloading(true);
    const user = validateAuth(email.current.value, password.current.value);
    if (!user) {
      setloading(false);
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/user/register`, user);
      if (response.status === 201) {
        toast.success(
          response.data?.data?.msg || "Account created successfully"
        );
        setloading(false);
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error?.explanation ||
          "Something went wrong while account creation"
      );
      setloading(false);
    }
  };
  return (
    <div className="flex justify-center h-screen items-center">
      <form
        className="flex flex-col gap-5 border p-8 border-black rounded"
        onSubmit={registerHandler}
      >
        <h1 className="text-lg text-center">Register</h1>
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
          Register
        </button>
        <Link to={"/login"} className="underline" disabled={loading}>
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default Register;
