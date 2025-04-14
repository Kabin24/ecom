import { Button, Input } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../config/store";
import { getAllUsers, setActiveUser } from "../../reducers/user.reducer";
import { IUserData } from "../../context/auth.context";
import { useSearchParams } from "react-router";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [_query, setQuery] = useSearchParams();

  const allList = useSelector((root: RootState) => {
    return root?.user?.userList as any;
  });

  const userPagination = useSelector((root: RootState) => {
    return root?.user?.userPagination as any;
  });

  const currentUser = useSelector((root: RootState) => {
    return root?.user?.userDetail as IUserData | null;
  });
  const loadMore = () => {
    const page = userPagination.page + 1;
    const limit = userPagination.limit;

    dispatch(
      getAllUsers({
        page: page,
        limit: limit,
      })
    );
  };

  return (
    <>
      <div className="flex w-full gap-3 mt-5 justify-between shadow pb-4">
        <Input.Search className="w-full" placeholder="Search by name.." />
        <button className="w-8 h-8  flex items-center justify-center bg-teal-800 rounded-full transition hover:cursor-pointer hover:scale-95 text-white">
          <AiOutlineEdit />
        </button>
      </div>
      <div className=" flex flex-col gap3">
        {allList ? (
          allList.map((user: any, index: number) => (
            <div
              key={index}
              className={`flex gap-3 p-5 shadow-2xl  mb-3 hover:bg-teal-200 hover:scale-95 transition hover:cursor-pointer  ${
                currentUser && currentUser._id === user._id
                  ? "bg-teal-400 hover:bg-teal-500"
                  : ""
              }`}
              onClick={() => {
                setQuery({
                  user: user._id,
                });
                dispatch(setActiveUser(user));
              }}
            >
              <img
                src={user.image.url}
                className="rounded-full w-[50px] h-[50px]"
              />

              <div className="flex flex-col">
                <h2 className=" font-semibold">{user.name}</h2>
                <p className="text-sm italic font-light">
                  {user.email},{""}
                  <span className="text-sm">{user.role}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
        {userPagination.totalPages > 0 &&
        userPagination.page < userPagination.totalPages ? (
          <div className="h-[100px] flex justify-center items-center">
            <Button onClick={loadMore}>Load More</Button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default UserList;
