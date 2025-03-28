import React, { useState } from "react";

import { Layout } from "antd";
import AdminSidebar from "../../components/sidebar/admin-sidebar.component.tsx";
import UserHeader from "../../components/header/user-header.component.tsx";
import { Outlet } from "react-router";

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

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
