import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/User";
import { toast } from "react-toastify";
import { UserDataContext } from "../context/UserContext";

const Login = () => {
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  let { setisLoggedin } = useContext(UserDataContext)
  let navigate = useNavigate()

  function handleLoginChange(e) {
    let { name, value } = e.target;
    setlogin((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      await userService.loginAccount({
        email: login.email,
        password: login.password,
      });
      toast.success("Login Success")
      setisLoggedin(true)
      localStorage.setItem("isLoggedin",true)
      navigate("/home")
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  return (
    <div className="w-full h-screen bg-zinc-900 text-white p-10">
      <h1 className="text-3xl font-semibold mb-5">Login Account</h1>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="px-3 py-2 bg-zinc-700 outline-none mr-4"
          value={login.email}
          onChange={handleLoginChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="px-3 py-2 bg-zinc-700 outline-none mr-4"
          value={login.password}
          onChange={handleLoginChange}
        />
        <button type="submit" className="px-3 py-2 bg-blue-600 rounded-lg">
          Login
        </button>
      </form>
      <span className="block mt-2">
        Don't have an account?{" "}
        <Link to={"/"} className="text-blue-600">
          Register
        </Link>
      </span>
    </div>
  );
};

export default Login;
