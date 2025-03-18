import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      // [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  // console.log(formData);

  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      formData.password === formData.confirmPassword ||
      formData.confirmPassword === ""
    ) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [formData.password, formData.confirmPassword]);
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register_form = new FormData();

      for (let key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        body: register_form,
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.log(`Registration error: ${error}`);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-blue-100">
      <div className="flex h-fit w-xs flex-col items-center justify-center rounded-2xl bg-white lg:w-xl">
        <p className="p-8 text-2xl font-semibold">Create an account </p>

        <form action="" className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            id="name"
            value={formData.name}
            className="mb-6 rounded-lg border px-4 py-4 text-center text-lg lg:w-96"
            required
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            className="mb-6 rounded-lg border px-4 py-4 text-center text-lg lg:w-96"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={formData.password}
            className="mb-6 rounded-lg border px-4 py-4 text-center text-lg lg:w-96"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Comfirm Password"
            id="confirmpassword"
            value={formData.confirmPassword}
            className="mb-6 rounded-lg border px-4 py-4 text-center text-lg lg:w-96"
            required
            onChange={handleChange}
          />

          {!passwordMatch && (
            <p className="mx-auto text-red-500">Password is not matching</p>
          )}

          <input
            type="file"
            id="profileImage"
            name="profileImage"
            className="hidden"
            onChange={handleChange}
          />
          <label
            htmlFor="profileImage"
            className="mb-6 cursor-pointer text-center text-gray-600 hover:text-gray-500"
          >
            <FontAwesomeIcon icon={faUpload} className="text-3xl" />
            <p>Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile picture"
              className="mb-2 h-20 w-20 self-center rounded-full object-cover"
            />
          )}

          <button
            type="submit"
            className="mb-2 w-fit cursor-pointer self-center rounded-lg border bg-blue-400 px-8 py-3 text-xl text-white hover:bg-blue-500"
            disabled={!passwordMatch}
          >
            Sign up
          </button>
          <p className="mb-8 self-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="cursor-pointer text-blue-400 hover:text-blue-500"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
