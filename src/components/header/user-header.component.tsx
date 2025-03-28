import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { NavLink } from "react-router";
import type { MenuProps } from "antd";
import { IoKeyOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

const UserHeader = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}) => {
  const userMemu: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <NavLink
          to="/profile-update"
          className="flex items-center gap-3 text-left"
        >
          <UserOutlined className="w-6 flex items-center justify-center" />
          <span>Update Profile</span>
        </NavLink>
      ),
    },
    {
      key: 2,
      label: (
        <NavLink
          to="/change-password"
          className="flex items-center gap-3 text-left"
        >
          <IoKeyOutline className="w-6 flex items-center justify-center" />
          <span>Change password</span>
        </NavLink>
      ),
    },
    {
      key: 3,
      label: (
        <NavLink to="/log-out" className="flex items-center gap-3 text-left">
          <CiLogout className="w-6 flex items-center justify-center" />
          <span>Log out</span>
        </NavLink>
      ),
    },
  ];

  return (
    <>
      <Header
        style={{ padding: 0 }}
        className="shadow-xl bg-gray-50! flex justify-between items-center"
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Dropdown menu={{ items: userMemu }} className="mr-5 mt-3">
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <img
                src="https://placehold.co/35x35"
                className="rounded-full bg-teal-100 p-0.5 shadow-xl"
                alt="user image"
              />
              Admin User
            </Space>
          </a>
        </Dropdown>
      </Header>
    </>
  );
};

export default UserHeader;
