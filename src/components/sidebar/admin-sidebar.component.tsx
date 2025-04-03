import {
  ApartmentOutlined,
  BoldOutlined,
  DollarCircleOutlined,
  FileImageOutlined,
  HomeOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Sider from "antd/es/layout/Sider";
import { Divider, Menu } from "antd";
import { NavLink } from "react-router";
import { useAuth } from "../../context/auth.context";

const AdminSidebar = ({ collapsed }: { collapsed: boolean }) => {
  const { loggedInUser } = useAuth();
  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        theme="dark"
        className="h-screen"
      >
        <div className="demo-logo-vertical flex flex-col  text-center justify-center mb-4">
          <div className="flex justify-center mt-2">
            <img
              src={
                loggedInUser?.image?.optimizedUrl ||
                "https://placehold.co/85x85"
              }
              className="rounded-full w-20 p-2"
              alt=""
            />
          </div>
          <p className="text-white">{loggedInUser?.name}</p>
        </div>
        <Divider className="bg-gray-800" />

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: <NavLink to={"/admin"}>Dashboard</NavLink>,
            },
            {
              key: "2",
              icon: <FileImageOutlined />,
              label: <NavLink to={"/admin/banner"}>Banner</NavLink>,
            },
            {
              key: "3",
              icon: <BoldOutlined />,
              label: <NavLink to={"/admin/brand"}>Brand</NavLink>,
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: <NavLink to={"/admin/users"}>User</NavLink>,
            },
            {
              key: "5",
              icon: <ApartmentOutlined />,
              label: <NavLink to={"/admin/category"}>Category</NavLink>,
            },
            {
              key: "6",
              icon: <ShoppingOutlined />,
              label: <NavLink to={"/admin/products"}>Produts</NavLink>,
            },
            {
              key: "7",
              icon: <ShoppingCartOutlined />,
              label: <NavLink to={"/admin/orders"}>Orders</NavLink>,
            },
            {
              key: "8",
              icon: <DollarCircleOutlined />,
              label: <NavLink to={"/admin/transaction"}>Transaction</NavLink>,
            },
            {
              key: "9",
              icon: <MessageOutlined />,
              label: <NavLink to={"/admin/chat"}>Mssages</NavLink>,
            },
          ]}
        />
      </Sider>
    </>
  );
};

export default AdminSidebar;
