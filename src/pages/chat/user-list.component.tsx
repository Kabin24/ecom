import { Input } from "antd";
import { AiOutlineEdit } from "react-icons/ai";

const UserList = () => {
  return (
    <>
      <div className="flex w-full gap-3 mt-5 justify-between shadow pb-4">
        <Input.Search className="w-full" placeholder="Search by name.." />
        <button className="w-8 h-8  flex items-center justify-center bg-teal-800 rounded-full transition hover:cursor-pointer hover:scale-95 text-white">
          <AiOutlineEdit />
        </button>
      </div>

      <div className="flex gap-3 p-5 shadow-2xl  mb-3 hover:bg-teal-200 hover:scale-95 transition hover:cursor-pointer">
        <img src="https://placehold.co/50x50" className="rounded-full" />

        <div className="flex flex-col">
          <h2 className=" font-semibold">Kabin shrestha</h2>
          <p className="text-sm italic font-light">
            kabinshrestha@gmail.com, <span className="text-sm">Admin</span>
          </p>
        </div>
      </div>

      <div className="flex gap-3 p-5 shadow-2xl  mb-3 hover:bg-teal-200 hover:scale-95 transition hover:cursor-pointer">
        <img src="https://placehold.co/50x50" className="rounded-full" />

        <div className="flex flex-col">
          <h2 className=" font-semibold">Kabin shrestha</h2>
          <p className="text-sm italic font-light">
            kabinshrestha@gmail.com, <span className="text-sm">Admin</span>
          </p>
        </div>
      </div>

      <div className="flex gap-3 p-5 shadow-2xl  mb-3 hover:bg-teal-200 hover:scale-95 transition hover:cursor-pointer">
        <img src="https://placehold.co/50x50" className="rounded-full" />

        <div className="flex flex-col">
          <h2 className=" font-semibold">Kabin shrestha</h2>
          <p className="text-sm italic font-light">
            kabinshrestha@gmail.com, <span className="text-sm">Admin</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserList;
