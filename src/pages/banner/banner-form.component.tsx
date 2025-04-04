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
export interface IBannerData {
  title: string;
  status: string;
  url: string;
  image: any;
}
interface IBannerFormProps {
  submitEvent: (data: IBannerData) => Promise<void>;
}

const BannerForm = ({ submitEvent }: IBannerFormProps) => {
  const BannerValidatorDTO = Yup.object({
    title: Yup.string().min(3).max(100).required(),
    url: Yup.string().default(""),
    status: Yup.string()
      .matches(/^(active|inactive)$/)
      .default("inactive"),
    image: Yup.mixed().default(""),
  });

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
      url: "",
      image: "",
    },
    resolver: yupResolver(BannerValidatorDTO),
    resetOptions: {
      keepValues: false,
      keepErrors: false,

      keepDefaultValues: false,
    },
  });
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
            <InputLabel classes={"text-black!"} htmlFor="url">
              Url:
            </InputLabel>
          </div>

          <div className="w-full md:w-3/4">
            <TextInputComponentHook
              control={control}
              name="url"
              type="url"
              errMsg={errors?.url?.message}
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
              setValue={(name: string, file: any) =>
                setValue(name as keyof IBannerData, file)
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
export default BannerForm;
