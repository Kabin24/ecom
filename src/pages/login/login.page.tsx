import { useState, useEffect } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import {
  InputLabel,
  PasswordInputComponent,
  SubmitButton,
  TextInputComponentHook,
} from "../../components/form/input.components.tsx";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router";
import { ICredentials, useAuth } from "../../context/auth.context.tsx";
import { notify, NotifyType } from "../../utilities/helpers.tsx";

const LoginPage = () => {
  const { login, loggedInUser } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");

  //validation rule
  const LoginDTO = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  //hook  form initialize

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as ICredentials,
    resolver: yupResolver(LoginDTO),
  });
  const submitLogin = async (data: ICredentials) => {
    try {
      const user: any = await login(data);
      navigate("/" + user.role);
    } catch (exception) {
      notify("sorry cnnot login at this  moment", NotifyType.ERROR);
    }
  };

  // if already loggedin
  useEffect(() => {
    if (loggedInUser && loggedInUser.role) {
      navigate("/" + loggedInUser.role);
    }
  }, [loggedInUser]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good morning!");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good afternoon!");
    } else if (currentHour >= 17 && currentHour < 20) {
      setGreeting("Good evening!");
    } else {
      setGreeting("Good night!");
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* First Column: Logo and Welcome Message */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gradient-to-r from-green-100 to-blue-900">
        <div className="flex flex-col items-center justify-center text-black-600 h-full mb-10">
          <img src="/logo.png" alt="logo" className="w-60 mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-center">{greeting}</h1>
          <p className="text-center">
            Please login to access your account and explore our platform.
          </p>
        </div>
      </div>

      {/* Second Column: Login Form */}
      <div className="flex items-center justify-center bg-white w-full md:w-1/2 p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 font-oswald">
            Login
          </h2>
          <form onSubmit={handleSubmit(submitLogin)}>
            <div className="flex flex-col mb-4 space-y-2">
              <InputLabel htmlFor="username">Username:</InputLabel>

              <TextInputComponentHook
                control={control}
                name="email"
                type="email"
                errMsg={errors?.email?.message}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <InputLabel htmlFor="password">Password:</InputLabel>
              <PasswordInputComponent
                control={control}
                name="password"
                errMsg={errors?.password?.message}
              />
            </div>

            <div className="flex  justify-between text-sm mb-4 ">
              <div className="flex gap-x-1 ">
                By logging in, I agree with the
                <NavLink
                  target="_blank"
                  to="/terms-and-conditions"
                  className="text-teal-600  pr-2 underline underline-offset-2"
                >
                  Terms and Conditions
                </NavLink>
              </div>
              <a
                href="/forget-password"
                className="text-sm text-teal-600 underline underline-offset-2"
              >
                Forgot Password?
              </a>
            </div>
            <div>
              <SubmitButton isSubmitting={isSubmitting} />
            </div>
            <div className="flex justify-center m-1 ">
              <NavLink
                to="/register"
                className="text-teal-900 underline underline-offset-2"
              >
                New user? Register Now
              </NavLink>
            </div>

            <button
              type="button"
              className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition duration-300"
            >
              <GoogleOutlined className="mr-2" />
              Login with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
