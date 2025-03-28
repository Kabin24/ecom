import { useState, useEffect } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { InputLabel } from "../../components/form/input.components.tsx";
import { Checkbox, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink } from "react-router";

interface ICredentialType {
  email: string;
  password: string;
  termsAndCondition: boolean;
}

const LoginPage = () => {
  const [greeting, setGreeting] = useState("");
  // const [credentials, setCredentials] = useState<ICredentialType>({
  //   email: "",
  //   password: "",
  //   termsAndCondition: false,
  // });

  //validation rule
  const LoginDTO = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
    termsAndCondition: yup.boolean().required(),
  });

  //hook  form initialize

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      termsAndCondition: false,
    } as ICredentialType,
    resolver: yupResolver(LoginDTO),
  });
  const submitHandler = (data: ICredentialType) => {
    console.log(data);
  };
  console.log(errors);

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
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 font-oswald">
            Login
          </h2>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col space-y-2">
              <InputLabel htmlFor="username">Username:</InputLabel>
              <Controller
                control={control}
                name="email"
                render={({ field }) => {
                  return (
                    <>
                      <Input
                        id={"email"}
                        type={"email"}
                        {...field}
                        status={errors?.email ? "error" : ""}
                        placeholder={`Enter your Username`}
                      />
                      <span className="text-red-800 text-sm italic">
                        {errors?.email?.message}
                      </span>
                    </>
                  );
                }}
              />{" "}
              {/* <TextInputComponent
              //   type="email"
              //   name="username"
              //   changeHandle={(event) => {
              //     setCredentials({
              //       ...credentials,
              //       email: event.target.value,
              //     });
              //   }}
              // /> */}
            </div>

            <div className="flex flex-col space-y-2">
              <InputLabel htmlFor="password">Password:</InputLabel>

              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <>
                    <Input.Password
                      type={"password"}
                      className={``}
                      {...field}
                      status={errors?.password ? "error" : ""}
                      placeholder={`Enter your Password`}
                    />
                    <span className="text-red-800 text-sm italic">
                      {errors?.password?.message}
                    </span>
                  </>
                )}
              />
            </div>

            <div className="flex items-center justify-between m-3">
              <div className="flex items-center">
                <Controller
                  control={control}
                  name="termsAndCondition"
                  render={({ field }) => (
                    <Checkbox
                      id={"termsAndCondition"}
                      className="text-teal-600  pr-2 underline"
                      checked={field.value}
                      {...field}
                    />
                  )}
                />

                {/* <Checkbox id="terms" className="me-1!" onChange={(e) => {}} /> */}
                <InputLabel htmlFor="terms">
                  Agree to{""}
                  <a
                    href="/terms-and-conditions"
                    className="text-teal-600  pr-2 underline"
                  >
                    Terms and Conditions
                  </a>
                </InputLabel>
              </div>
              <a
                href="/forget-password"
                className="text-sm text-teal-600 underline"
              >
                Forgot Password?
              </a>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-900 text-white py-2 rounded transition duration-300 "
              >
                Login
              </button>
            </div>
            <div className="flex justify-center m-5 ">
              <NavLink to="/register" className="text-teal-500 underline">
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
