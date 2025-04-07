import { Input } from "antd";

const SendMessage = () => {
  return (
    <>
      <Input.TextArea
        rows={3}
        placeholder="Type your message..."
        className="flex-1 resize-none placeholder:text-black!"
      />
      <button className="bg-teal-400 text-black px-4 py-2 rounded-lg hover:bg-teal-600 transition">
        Send
      </button>
    </>
  );
};
export default SendMessage;
