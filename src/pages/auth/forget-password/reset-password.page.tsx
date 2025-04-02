import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import authSvc from "../../../services/auth.service";
import { GoogleOutlined } from "@ant-design/icons";
import { notify, NotifyType } from "../../../utilities/helpers";
import { useForm } from "react-hook-form";
import {
  InputLabel,
  PasswordInputComponent,
  SubmitButton,
} from "../../../components/form/input.components";

const ResetPassword = () => {
  const params = useParams();
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      token: "",
      password: "",
      confirmPassword: "",
    },
  });
  const submitFormEvent = async (data: {
    token: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      await authSvc.patchRequest("/auth/reset-password", data);
      notify(
        "Your password  has been reset . please login",
        NotifyType.SUCCESS
      );
      navigate("/");
    } catch (exception) {
      console.log(exception);

      notify("sorry password  cannot be reset", NotifyType.ERROR);
    }
  };

  const verifyToken = async () => {
    try {
      const frogetPasswordToken = params.forgetToken;
      const { result }: any = await authSvc.getRequest(
        "/auth/verify-token/" + frogetPasswordToken
      );

      //
      setToken(result.data.verifyToken);
      setValue("token", result.data.verifyToken);
    } catch (exception) {
      console.log(exception);

      notify(
        "Sorry! Token cannot be verified ! Please try again",
        NotifyType.ERROR
      );
      navigate("/forget-password");
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen w-full">
        {/* First Column: Logo and Welcome Message */}
        <div className="hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-gradient-to-r from-green-100 to-blue-900 p-6">
          <div className="text-center max-w-md px-4">
            <div className="mb-6 md:mb-10">
              <img
                src="/logo.png"
                alt="logo"
                className="w-28 md:w-32 h-auto mx-auto"
              />
            </div>

            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">
              Never forget what you set!!!
            </h1>
            <p className="text-sm md:text-lg">
              पासवर्ड बिर्सनुभयो? चिन्ता नगर्नुस्, सजिलै पुनः प्राप्त गर्नुहोस्!
            </p>
          </div>
        </div>

        {/* Second Column: Login Form */}
        <div className="flex items-center justify-center bg-mignight w-full md:w-1/2 p-4 ">
          <div className="w-full max-w-xl  bg-gray-100 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl  font-bold text-center mb-6 text-gray-800 font-oswald">
              Reset Password
            </h2>
            <form
              onSubmit={handleSubmit(submitFormEvent)}
              className="flex flex-col gap-5"
            >
              <div>
                <InputLabel htmlFor="password">Password</InputLabel>
                <PasswordInputComponent
                  name="password"
                  control={control}
                  errMsg={errors?.password?.message}
                />
              </div>
              <div>
                <InputLabel htmlFor="confirmPassword">Re-Password</InputLabel>
                <PasswordInputComponent
                  name="confirmPassword"
                  control={control}
                  errMsg={errors?.confirmPassword?.message}
                />
              </div>
              <div>
                <SubmitButton isSubmitting={isSubmitting} />
              </div>
            </form>

            <div className="flex flex-col gap-3  text-center">
              <p className=" text-sm  text-black">
                New User ?{" "}
                <NavLink
                  to={"/register"}
                  className="text-blue-600 underline mx-2 underline-offset-2"
                >
                  Register
                </NavLink>{" "}
              </p>
              <p className="text-sm  mb-2 text-black">
                Already have an Account
                <NavLink
                  to={"/"}
                  className="text-blue-600 underline mx-2 underline-offset-2"
                >
                  Login here
                </NavLink>
              </p>
            </div>
            <button
              type="button"
              className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition duration-300"
            >
              <GoogleOutlined className="mr-2" />
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
