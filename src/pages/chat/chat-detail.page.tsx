import { Content } from "antd/es/layout/layout";

import MessageBox from "./message-box.component";
import SendMessage from "./send-message.component";
import UserList from "./user-list.component";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../config/store";
import { useEffect } from "react";
import { getAllUsers } from "../../reducers/user.reducer";

const ChatPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      getAllUsers({
        page: 1,
        limit: 20,
        search: null,
      })
    );
  }, []);
  return (
    <>
      <Content className="m-3 bg-gray-50 h-fit flex">
        <div className="w-1/4 h-[550px] bg-teal-100 overflow-y-scroll">
          <div className="flex h-[50px] bg-teal-200 items-center justify-center shadow">
            <h1 className="text-2xl font-semibold font-sans">Chat</h1>
          </div>
          <UserList />
        </div>

        <div className="w-3/4">
          <div className="flex  flex-col h-full">
            <MessageBox />
            <div className="flex items-center gap-3 p-4 border-t">
              <SendMessage />
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default ChatPage;
