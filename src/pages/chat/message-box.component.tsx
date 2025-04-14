import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { AppDispatch, RootState } from "../../config/store";
import { getUserDetail } from "../../reducers/user.reducer";
import { IUserData } from "../../context/auth.context";

const MessageBox = () => {
  const [query] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const [message, setMessage] = useState<any>([]);

  const userDetail = useSelector((root: RootState) => {
    return root?.user?.userDetail as IUserData | null;
  });

  useEffect(() => {
    if (query.get("user")) {
      dispatch(getUserDetail({ id: query.get("user") as string }));
    }
  }, [query]);

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-3">
          {message && message.length > 0 ? (
            <>
              <div className="flex items-start gap-3">
                <img
                  src="https://placehold.co/40x40"
                  className="rounded-full"
                />
                <div>
                  <p className="text-xs text-gray-500">Smarika</p>
                  <div className="bg-gray-200 p-3 rounded-lg max-w-xs">
                    <p className="text-sm">I love you</p>
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-3 justify-end">
                <div className="bg-teal-500 text-white p-3 rounded-lg max-w-xs">
                  <p>Hi! I love you too.</p>
                </div>
                <p className="text-xs text-gray-500 text-right">You</p>
                <img
                  src="https://placehold.co/40x40"
                  className="rounded-full"
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default MessageBox;
