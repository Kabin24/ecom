import React, { ChangeEventHandler, ReactNode, useState } from "react";
import { Button, Input, Radio, Select, Upload } from "antd";
import { Controller, useController } from "react-hook-form";
import type { UploadProps, UploadFile } from "antd";
import { AiOutlineClose, AiOutlineSend, AiOutlineUpload } from "react-icons/ai";
export interface IClassProps {
  classes?: string | null;
}
export interface IInputProps extends IClassProps {
  name: string;
  errMsg?: string | null;
  control?: any;
  changeHandle?: ChangeEventHandler<HTMLInputElement>;
}

export interface ITextInput extends IInputProps {
  type: string;
}

interface ITextInputHook {
  name: string;
  control: any;
  type: string;
  classes?: string | null;
  errMsg?: string | null;
}
export interface IInputLabel {
  htmlFor: string | undefined;
  classes?: string;
  children: ReactNode;
}

export interface IRadioInput extends IInputProps {
  options: Array<{ label: string; value: string }>;
}

export interface ITextAreaInputProps extends IInputProps {
  rows?: number | 3;
  maxRows?: number | 5;
}

export interface ISelectInput extends IRadioInput {
  isMultiple?: boolean;
}

export interface IFileUploaderProps {
  name: string;
  setValue: (name: string, file: any) => void;
  thumbnail?: string;
}
export const TextInputComponent = (props: Readonly<ITextInput>) => {
  return (
    <React.Fragment>
      <Input
        type={props.type}
        id={props.name}
        status={props.errMsg ? "error" : ""}
        placeholder={`Enter your ${props.name}`}
        className={`${props.classes}`}
        onChange={props.changeHandle}
      />
      <span className="text-sm italic  text-red-700">{props?.errMsg}</span>
    </React.Fragment>
  );
};

export const TextInputComponentHook = (props: Readonly<ITextInputHook>) => {
  const { field } = useController({
    name: props.name,
    control: props.control,
  });
  return (
    <React.Fragment>
      <Input
        type={props.type}
        placeholder={`Enter your ${props.name}`}
        status={props.errMsg ? "error" : ""}
        className={`${props.classes}`}
        {...field}
      />
      <span className="text-sm italic  text-red-700">{props?.errMsg}</span>
    </React.Fragment>
  );
};
export const TextInputComponentController = (
  props: Readonly<ITextInputHook>
) => {
  // const { field } = useController({
  //   name: props.name,
  //   control: props.control,
  // });
  return (
    <React.Fragment>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => (
          <>
            <Input
              type={props.type}
              placeholder={`Enter your ${props.name}`}
              className={`${props.classes}`}
              status={props.errMsg ? "error" : ""}
              {...field}
            />
            <span className="text-sm italic  text-red-700">
              {props?.errMsg}
            </span>
          </>
        )}
      ></Controller>
    </React.Fragment>
  );
};

export const PasswordInputComponent = ({
  name,
  classes = "",
  control,
  errMsg = null,
}: Readonly<IInputProps>) => {
  return (
    <React.Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Input.Password
              id={name}
              className={`${classes}`}
              status={errMsg ? "error" : ""}
              placeholder={`Enter your ${name}`}
              {...field}
            />
            <span className="text-sm italic text-red-700"> {errMsg}</span>
          </>
        )}
      ></Controller>
    </React.Fragment>
  );
};

export const InputLabel = ({
  htmlFor,
  classes = "",
  children,
}: Readonly<IInputLabel>) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className={`block text-sm font-medium p-2 text-black ${classes}`}
      >
        {children}
      </label>
    </>
  );
};

export const RadioInputComponent = ({
  name,
  control,
  options,
  errMsg = null,
}: Readonly<IRadioInput>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Radio.Group {...field} options={options} />
            <span className="text-sm italic text-red-700"> {errMsg}</span>
          </>
        )}
      />
    </>
  );
};

export const SelectInputComponent = ({
  name,
  control,
  options,
  errMsg = null,
}: Readonly<ISelectInput>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Select {...field} options={options} />
            <span className="text-sm italic text-red-700"> {errMsg}</span>
          </>
        )}
      />
    </>
  );
};

export const TextAreaInputComponentHook = (
  props: Readonly<ITextAreaInputProps>
) => {
  const { field } = useController({
    name: props.name,
    control: props.control,
  });
  return (
    <React.Fragment>
      <Input.TextArea
        placeholder="Enter your value...."
        autoSize={{
          minRows: props.rows as number,
          maxRows: props.rows as number,
        }}
        {...field}
      />

      <span className="text-sm italic  text-red-700">{props?.errMsg}</span>
    </React.Fragment>
  );
};

interface ISendButtonProps {
  isSubmitting?: boolean;
}
export const SubmitButton = ({ isSubmitting }: ISendButtonProps) => {
  return (
    <>
      <Button
        variant="solid"
        icon={<AiOutlineSend />}
        htmlType="submit"
        disabled={isSubmitting}
        className="h-10! bg-green-800! border-green-800! hover:bg-green-950! hover:border-green-900! text-white! w-full  mt-3 py-2"
      >
        Submit
      </Button>
    </>
  );
};

export const CancelButton = ({ isSubmitting }: ISendButtonProps) => {
  return (
    <>
      <Button
        variant="solid"
        icon={<AiOutlineClose />}
        htmlType="reset"
        disabled={isSubmitting}
        className="h-10! bg-red-800! border-red-800! hover:bg-red-950! hover:border-red-900! text-white! w-full  mt-3 py-2"
      >
        Cancel
      </Button>
    </>
  );
};
export const SingleImageUploader = ({
  name,
  setValue,
  thumbnail,
}: IFileUploaderProps) => {
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
      setValue(name, file as any);
      return false;
    },
    fileList,
  };
  return (
    <>
      <div className="flex">
        <div className="w-1/4">
          <Upload {...props} className="text-black!">
            <Button icon={<AiOutlineUpload />}> Select File</Button>
          </Upload>
        </div>
        <div className="w-3/4">
          {fileList && fileList.length ? (
            <>
              <img
                src={URL.createObjectURL(fileList[0] as any)}
                className="  h-[100px] "
                alt=""
              />
            </>
          ) : thumbnail ? (
            <>
              <img src={thumbnail} className="h-[100px]" alt="" />
            </>
          ) : (
            <img
              src="https://placehold.co/300x75/orange/white?text=Upload Image"
              alt=""
            />
          )}
        </div>
      </div>
    </>
  );
};
