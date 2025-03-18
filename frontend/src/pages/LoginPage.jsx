import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //fetching data
      const response = await fetch(
        "https://booking-rentals-api.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const loggedIn = await response.json();

      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          }),
        );
        navigate("/");
      }
    } catch (error) {
      console.log("Login Failed: ", error.message);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-blue-100">
      <div className="flex h-fit w-xs flex-col items-center justify-center rounded-2xl bg-white lg:w-xl">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-10 mb-6 rounded-lg border px-4 py-4 text-center text-lg lg:w-96"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 rounded-lg border px-4 py-4 text-center text-lg lg:w-96"
          />

          <button
            type="submit"
            className="mb-2 w-fit cursor-pointer self-center rounded-lg border bg-blue-400 px-8 py-3 text-xl text-white hover:bg-blue-500"
          >
            Log in
          </button>
          <p className="mb-8 self-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="cursor-pointer text-blue-400 hover:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
