import { Typography, Input, Table, Popconfirm } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { NavLink } from "react-router";
import { notify, NotifyType } from "../../utilities/helpers";
import bannerSvc from "../../services/banner.service";
import { IResponseType } from "../../services/http.service";
import {
  IGetAllBannerProps,
  PaginationType,
} from "../../contracts/https-contracts";
import { bannerColumns, IBannerData } from "./banner.contract";

const BannerList = () => {
  const [data, setData] = useState<Array<IBannerData>>();
  const [loading, setloading] = useState<boolean>(true);
  const [paginationData, setPaginationData] = useState<PaginationType>({
    total: 0,
    pageSize: 10,
    current: 1,
  });
  const [search, setSearch] = useState<string>();

  const handleTableChange = async (pagination: PaginationType) => {
    await getAllBanner({
      limit: pagination.pageSize,
      page: pagination.current,
    });
  };

  const getAllBanner = async ({
    page = paginationData.current,
    limit = paginationData.pageSize,
    search = null,
  }: IGetAllBannerProps) => {
    setloading(true);
    try {
      const { result }: IResponseType = await bannerSvc.getRequest("/banner", {
        params: {
          limit: limit,
          page: page,
          search: search,
        },
      });
      setData(result.data as Array<IBannerData>);
      setPaginationData({
        total: result.options.total,
        pageSize: result.options.limit,
        current: result.options.page,
      });

      setloading(false);
    } catch (exception) {
      notify("Banner cannot  be fetch at this momemt", NotifyType.ERROR);
      setloading(false);
    }
  };

  useEffect(() => {
    getAllBanner({
      page: paginationData.current,
      limit: paginationData.pageSize,
    });

    bannerColumns.push({
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
                onConfirm={async (e) => {
                  try {
                    e?.preventDefault();
                    await bannerSvc.deleteRequest("/banner/" + value);
                    notify("banner  deleted ", NotifyType.SUCCESS);
                    getAllBanner({ page: 1, limit: paginationData.pageSize });
                  } catch (exception) {
                    notify(
                      "banner cannot be deleted at this momemt",
                      NotifyType.ERROR
                    );
                    throw exception;
                  }
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
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      getAllBanner({
        page: paginationData.current,
        limit: paginationData.pageSize,
        search: search,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

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
        <div className="flex flex-col gap-5 mt-5">
          <div className="w-1/4">
            <Input.Search
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Enter your search keyword..."
            />
          </div>

          <div>
            <Table
              size="small"
              columns={bannerColumns}
              dataSource={data}
              loading={loading}
              rowKey={(record) => record.id}
              pagination={paginationData}
              onChange={handleTableChange}
            />
          </div>
        </div>
      </Content>
    </>
  );
};

export default BannerList;
