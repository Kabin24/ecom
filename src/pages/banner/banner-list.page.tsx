import { Typography, Input, Table, Button, Popconfirm } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { NavLink } from "react-router";

const BannerList = () => {
  const bannerColumns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Url",
      dataIndex: "url",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value: string) => (
        <Button
          variant="filled"
          className="bg-red-700"
          color={value === "active" ? "green" : "red"}
        >
          {value === "active" ? "Published" : "Un-Published"}
        </Button>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
    },
    {
      title: "Actions",
      dataIndex: "id",
      render: (value: string) => {
        return (
          <>
            <div className="flex gap-2">
              <NavLink
                to={"/admin/banner/" + value}
                className={
                  "flex w-8 h-8 bg-teal-800! rounded-full text-white! items-center justify-center hover:bg-teal-900!"
                }
              >
                <AiOutlineEdit />
              </NavLink>
              <Popconfirm
                title="Are you sure?"
                description="Once confirmed, the deleted content cannot be reverted back."
                okText="Confirm"
                cancelText="Cancel"
                okButtonProps={{
                  className: "bg-teal-800! border-teal-800! text-sm! ",
                }}
                cancelButtonProps={{
                  className: "bg-red-800! text-white! border-red-800! text-sm!",
                }}
              >
                <span
                  className={
                    "flex w-8 h-8 bg-red-800! rounded-full text-white! items-center justify-center hover:bg-red-900!"
                  }
                >
                  <AiOutlineDelete />
                </span>
              </Popconfirm>
            </div>
          </>
        );
      },
    },
  ];

  const [data, setData] = useState<Array<any>>([
    {
      id: "",
      title: "Baner",
      url: "",
      status: "",
      image: { publicUrl: "", optimizeUrl: "" },
      createdAt: "",
      updatedAt: "",
    },
  ]);

  type PaginationType = {
    total: number;
    pageSize: number;
    current: number;
  };

  const handleTableChange = (pagination: PaginationType) => {};
  return (
    <>
      <Content className="bg-white! m-5 p-5">
        <div className="flex justify-between border-b border-b-gray-200 ">
          <Typography.Title className="text-teal-700! underline underline-offset-4">
            Banner List
          </Typography.Title>

          <NavLink
            to={"/admin/banner/create"}
            className={
              "flex gap-1 items-center justify-center bg-teal-700! p-1.5 h-10 text-white! rounded-md hover:bg-teal-900!"
            }
          >
            <AiOutlinePlus /> Add Banner
          </NavLink>
        </div>
        <div className="flex flex-col gap-5">
          <div className="w-1/4">
            <Input.Search placeholder="Enter your search keyword..." />
          </div>

          <div>
            <Table
              size="small"
              columns={bannerColumns}
              dataSource={data}
              rowKey={(record) => record.id}
              pagination={{
                total: 100,
                pageSize: 10,
                current: 1,
              }}
              onChange={handleTableChange}
            />
          </div>
        </div>
      </Content>
    </>
  );
};

export default BannerList;
