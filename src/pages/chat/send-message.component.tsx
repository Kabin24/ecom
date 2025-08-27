import { useSelector } from "react-redux";
import { RootState } from "../../config/store";
import { useForm } from "react-hook-form";
import {
  SubmitButton,
  TextAreaInputComponentHook,
} from "../../components/form/input.components";
import { IUserData } from "../../context/auth.context";
import chatSvc from "../../services/chat.service";

const SendMessage = () => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const userDetail = useSelector((root: RootState) => {
    return root?.user?.userDetail as IUserData | null;
  });

  const submitEvent = async (data: { message: string }) => {
    try {
      const payload = {
        message: data.message,
        receiver: userDetail?._id,
      };
      await chatSvc.postRequest("/chat/", payload);
    } catch (exception) {}
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitEvent)}
        className="flex flex-row gap-3 w-full"
      >
        <TextAreaInputComponentHook
          control={control}
          name="message"
          rows={3}
          errMsg={errors?.message?.message}
        />

        <div>
          <SubmitButton isSubmitting={isSubmitting}></SubmitButton>
        </div>
      </form>
    </>
  );
};
export default SendMessage;
