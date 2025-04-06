import { useForm } from "react-hook-form";
import {
  CancelButton,
  InputLabel,
  SelectInputComponent,
  SingleImageUploader,
  SubmitButton,
  TextInputComponentHook,
} from "../../components/form/input.components";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spin } from "antd";
import { useEffect, useState } from "react";
export interface IBrandData {
  title: string;
  status: string;
  data: string;

  image: any;
}
interface IBrandFormProps {
  submitEvent: (data: IBrandData) => Promise<void>;
  brand?: IBrandData;
}

const BrandForm = ({ submitEvent, brand }: IBrandFormProps) => {
  const BrandValidatorDTO = Yup.object({
    title: Yup.string().min(3).max(100).required(),

    status: Yup.string()
      .matches(/^(active|inactive)$/)
      .default("inactive"),
    image: Yup.mixed().default(""),
  });
  const [thumbnail, setThumbnail] = useState<string>();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      status: "",

      image: "",
    },
    resolver: yupResolver(BrandValidatorDTO),
    resetOptions: {
      keepValues: false,
      keepErrors: false,

      keepDefaultValues: false,
    },
  });

  useEffect(() => {
    if (brand) {
      setValue("title", brand?.title);

      setValue("status", brand?.status);
      setThumbnail(brand?.image?.optimizeUrl);
    }
  }, [brand]);
  return (
    <>
      {isSubmitting ? <Spin fullscreen></Spin> : <></>}
      <form
        className="my-5 flex flex-col gap-4 pl-10 p-r-10"
        onSubmit={handleSubmit(submitEvent)}
        onReset={() => {
          reset();
        }}
      >
        <div className="flex ">
          <div className="w-full md:w-1/4">
            <InputLabel classes={"text-black!"} htmlFor="title">
              Title:
            </InputLabel>
          </div>

          <div className="w-full md:w-3/4">
            <TextInputComponentHook
              control={control}
              name="title"
              type="text"
              errMsg={errors?.title?.message}
            />
          </div>
        </div>

        <div className="flex ">
          <div className="w-full md:w-1/4">
            <InputLabel classes={"text-black!"} htmlFor="status">
              Status:
            </InputLabel>
          </div>

          <div className="w-full md:w-3/4">
            <SelectInputComponent
              control={control}
              name="status"
              options={[
                { label: "Publish", value: "active" },
                { label: "Un-Publish", value: "inactive" },
              ]}
            />
          </div>
        </div>
        <div className="flex ">
          <div className="w-full md:w-1/4">
            <InputLabel classes={"text-black"} htmlFor="Image">
              Image
            </InputLabel>
          </div>
          <div className="w-full md:w-3/4">
            <SingleImageUploader
              name={"image"}
              thumbnail={thumbnail}
              setValue={(name: string, file: any) =>
                setValue(name as keyof IBrandData, file)
              }
            />
          </div>
        </div>

        <div className="flex">
          <div className="w-full md:w-1/4"></div>
          <div className="w-full md:w-1/4 flex gap-3">
            <CancelButton isSubmitting={isSubmitting} />
            <SubmitButton isSubmitting={isSubmitting} />
          </div>
        </div>
      </form>
    </>
  );
};
export default BrandForm;
