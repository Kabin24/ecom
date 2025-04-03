import React, { useEffect, useState } from "react";

import { Layout } from "antd";
import AdminSidebar from "../../components/sidebar/admin-sidebar.component.tsx";
import UserHeader from "../../components/header/user-header.component.tsx";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../context/auth.context.tsx";

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/");
    }
  }, []);

  return (
    <Layout hasSider={true}>
      <AdminSidebar collapsed={collapsed} />

      <Layout>
        <UserHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
