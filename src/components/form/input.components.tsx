import React, { ChangeEventHandler, ReactNode } from "react";
import { Input, Radio, Select } from "antd";
import { Controller, useController } from "react-hook-form";

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
            <Select mode="multiple" {...field} options={options} />
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
