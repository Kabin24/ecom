import { Input } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../config/store";

const SendMessage = () => {
  const userDetail = useSelector((root: RootState) => {});
  return (
    <>
      <Input.TextArea
        rows={3}
        placeholder="Type your message..."
        className="flex-1 resize-none "
      />
      <button className="bg-teal-500 text-white  px-4 py-2 rounded-lg hover:bg-teal-600 transition ">
        Send
      </button>
    </>
  );
};
export default SendMessage;
