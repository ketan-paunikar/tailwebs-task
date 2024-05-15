import React, { useEffect, useState } from "react";
import "./login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { validateLogin } from "../../Utils/validation";
import {
  selectPassword,
  selectUserName,
} from "../../Reducers/LoginSlice/loginSlice";
import { Toaster } from "../../Utils/toaster";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const Login = () => {
  const UserID = useSelector(selectUserName);
  const pwd = useSelector(selectPassword);
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // Password toggle handler
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // formik for login form
  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validateLogin,
    onSubmit: () => {
      if (
        loginFormik.values.username === UserID &&
        loginFormik.values.password === pwd
      ) {
        navigate("/studentportal");
        Toaster("success", "Logged In Successfully");
      } else {
        Toaster("error", "Invalid Credentials");
      }
    },
  });

  return (
    <div className="bg-gray-200 h-[100vh] px-12 py-16">
      <div className="flex justify-center items-center">
        <p className="font-semibold text-[40px] text-red-600">tailwebs.</p>
      </div>
      <div className="mt-10 flex justify-center items-center">
        <form onSubmit={loginFormik.handleSubmit}>
          <div className="login-card py-14 px-24">
            <div>
              <p>Username</p>
              <div className="mt-2 px-2 rounded h-[40px] flex items-center border-[1px] border-solid border-[#cfcfcf]">
                <span className="icons pr-[6px]">
                  <PersonIcon
                    sx={{
                      fontSize: "18px",
                      marginBottom: "3px",
                      color: "#979595",
                    }}
                  />
                </span>
                <input
                  type="text"
                  name="username"
                  className="pwd-input pl-3"
                  placeholder="Enter Username..."
                  onChange={loginFormik.handleChange}
                />
              </div>
              {loginFormik.touched.username && loginFormik.errors.username && (
                <p className="text-red-500 font-normal">
                  {loginFormik.errors.username}
                </p>
              )}
            </div>
            <div className="mt-3">
              <p>Password</p>
              <div className="mt-2 px-2 rounded h-[40px] flex justify-between items-center border-[1px] border-solid border-[#cfcfcf]">
                <span className="icons pr-[6px]">
                  <LockOpenIcon
                    sx={{
                      fontSize: "18px",
                      marginBottom: "3px",
                      color: "#979595",
                    }}
                  />
                </span>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="pwd-input pl-3"
                  placeholder="Enter Password..."
                  onChange={loginFormik.handleChange}
                />
                <span
                  onClick={togglePassword}
                  className="eyeIcon cursor-pointer"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              </div>
              {loginFormik.touched.password && loginFormik.errors.password && (
                <p className="text-red-500 font-normal">
                  {loginFormik.errors.password}
                </p>
              )}
            </div>
            <p className="mt-3 text-right text-blue-400 font-normal cursor-pointer">
              Forgot password?
            </p>
            <div className="p-6 flex justify-center items-center mt-4">
              <button className="login-btn" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
