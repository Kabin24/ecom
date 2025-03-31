import { GoogleOutlined, UploadOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router";
import {
  InputLabel,
  PasswordInputComponent,
  RadioInputComponent,
  SelectInputComponent,
  TextAreaInputComponentHook,
  TextInputComponentHook,
} from "../../../components/form/input.components";
import { useForm } from "react-hook-form";
import type { UploadProps } from "antd";
import { Button, Upload, UploadFile } from "antd";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import authSvc from "../../../services/auth.service";
import { notify } from "../../../utilities/helpers";

export const Register = () => {
  const navigate = useNavigate();
  const RegisterDTO = Yup.object({
    fullName: Yup.string().min(2).max(50).required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-.])[a-zA-Z\d!@#$%^&*-.]{8,25}$/
      )
      .required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")])
      .required(),
    role: Yup.string()
      .matches(/^(customer|seller)$/)
      .default("customer"),
    gender: Yup.string().matches(/^(male|female|other)$/),
    address: Yup.string(),
    phone: Yup.string().min(10).max(25).required(),
    image: Yup.mixed().optional(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      gender: "",
      address: "",
      phone: "",
      image: null,
    },
    resolver: yupResolver(RegisterDTO),
  });
  const data = "If you are new, please register";

  const formSubmit = async (data: any) => {
    try {
      const response = await authSvc.postRequest("/auth/register", data, {
        file: true,
      });
      notify(
        "Thank you for registration.An email has been forwarded to you registered account. Please follow the steps",
        "success"
      );
      //redirest to login
      navigate("/");

      console.log(response);
    } catch (exception) {
      console.log(exception);
      notify("There  was a problem while creating your account.", "error");
    }
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      setValue("image", file as any);
      return false;
    },
    fileList,
  };
  return (
    <div className="flex flex-col md:flex-row ">
      {/* First Column: Logo and Welcome Message */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-8 bg-gradient-to-r from-green-100 to-blue-900">
        <div className="flex flex-col items-center text-black h-full mb-6">
          <img
            src="/logo.png"
            alt="logo"
            className="w-40 md:w-60 mb-4 md:mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-center">
            Welcome
          </h1>
          <p className="text-base md:text-lg text-center px-4">{data}</p>
        </div>
      </div>

      {/* Second Column: Register Form */}
      <div className="flex flex-col justify-center items-center w-full bg-gray-200  md:w-1/2 p-0 ">
        <div className="w-full max-w-lg bg-gray-200 p-6 rounded-lg ">
          <h2 className="text-xl font-semibold text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="flex flex-col mb-0.5 ">
              <InputLabel htmlFor="fullname">Full Name:</InputLabel>
              <TextInputComponentHook
                type={"text"}
                name="fullName"
                control={control}
                errMsg={errors?.fullName?.message}
              />
            </div>
            <div className="flex flex-col mb-0.5">
              <InputLabel htmlFor="email">Email:</InputLabel>
              <TextInputComponentHook
                type={"email"}
                name="email"
                control={control}
                errMsg={errors?.fullName?.message}
              />
            </div>
            <div className="flex flex-col ">
              <InputLabel htmlFor="password">Password</InputLabel>
              <PasswordInputComponent
                name="password"
                control={control}
                errMsg={errors?.password?.message}
              />
            </div>
            <div className="flex flex-col ">
              <InputLabel htmlFor="confirmPassword">Re-Password</InputLabel>
              <PasswordInputComponent
                name="confirmPassword"
                control={control}
                errMsg={errors?.confirmPassword?.message}
              />
            </div>
            <div className="flex flex-col ">
              <InputLabel htmlFor="email">Phone(mobile)</InputLabel>
              <TextInputComponentHook
                type={"tel"}
                name="phone"
                control={control}
                errMsg={errors?.phone?.message}
              />
            </div>
            <div className="flex flex-col ">
              <InputLabel htmlFor="gender">Gender:</InputLabel>
              <RadioInputComponent
                name="gender"
                control={control}
                errMsg={errors?.gender?.message}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
              />
            </div>
            <div className="flex flex-col ">
              <InputLabel htmlFor="role">Role:</InputLabel>
              <SelectInputComponent
                name="role"
                control={control}
                errMsg={errors?.role?.message}
                options={[
                  { value: "seller", label: "Seller" },
                  { value: "customer", label: "Buyer" },
                ]}
              />
            </div>
            <div className="flex flex-col ">
              <InputLabel htmlFor="address">Address</InputLabel>
              <TextAreaInputComponentHook
                name="address"
                control={control}
                rows={3}
                maxRows={5}
                errMsg={errors?.phone?.message}
              />
            </div>
            <div className="mb-3">
              <InputLabel htmlFor="image">Image:</InputLabel>

              <Upload {...props}>
                <Button icon={<UploadOutlined />}> Select File</Button>
              </Upload>
              {/* <input
                type="file"
                name="image"
                accept="image/*"
                className="border broder-gray-100"
              /> */}
            </div>
            <div className="mb-4">
              <Button
                disabled={isSubmitting}
                htmlType="submit"
                className="w-full bg-black hover:bg-blue-900 text-white py-2 rounded transition duration-300 "
              >
                Register
              </Button>
            </div>
          </form>
          <div className="mt-4 md:mt-5 text-center">
            <p className="text-teal-500 text-sm md:text-base">
              Already have an account?{" "}
              <NavLink to="/" className="text-black underline">
                Login Here
              </NavLink>
            </p>
            <button className="mt-4 w-full flex items-center justify-center bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-700 transition">
              <GoogleOutlined className="mr-2" />
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
