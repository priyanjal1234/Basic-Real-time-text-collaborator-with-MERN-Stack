import React, { useContext, useEffect, useState } from "react";
import userService from "../services/User";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const Register = () => {
  const [register, setregister] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  let { isLoggedin, setisLoggedin } = useContext(UserDataContext);

  useEffect(() => {
    if (isLoggedin) {
      return navigate("/home");
    }
    return navigate("/");
  }, []);

  function handleRegisterChange(e) {
    let { name, value } = e.target;
    setregister((prev) => ({ ...prev, [name]: value }));
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();

    try {
      let registerRes = await userService.createAccount({
        name: register.name,
        email: register.email,
        password: register.password,
      });
      toast.success("Registration Successfull");
      setisLoggedin(true);
      localStorage.setItem("isLoggedin", true);

      navigate("/home");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  return (
    <div className="w-full h-screen bg-zinc-900 text-white p-10">
      <h1 className="text-3xl font-semibold mb-5">Create Your Account</h1>
      <form onSubmit={handleRegisterSubmit}>
        <input
          className="px-3 py-2 bg-zinc-700 outline-none mr-4"
          type="text"
          placeholder="Name"
          name="name"
          value={register.name}
          onChange={handleRegisterChange}
        />
        <input
          className="px-3 py-2 bg-zinc-700 outline-none mr-4"
          type="email"
          placeholder="Email"
          name="email"
          value={register.email}
          onChange={handleRegisterChange}
        />
        <input
          className="px-3 py-2 bg-zinc-700 outline-none mr-4"
          type="password"
          placeholder="Password"
          name="password"
          value={register.password}
          onChange={handleRegisterChange}
        />
        <button type="submit" className="px-3 py-2 bg-blue-600 rounded-lg">
          Create
        </button>
      </form>
      <span className="block mt-3">
        Already have an account?
        <Link to={"/login"} className="text-blue-600 mt-2 ml-2">
          Login
        </Link>
      </span>
    </div>
  );
};

export default Register;
