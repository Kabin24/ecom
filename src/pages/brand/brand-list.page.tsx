import { Typography, Input, Table, Popconfirm } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { NavLink } from "react-router";
import { notify, NotifyType } from "../../utilities/helpers";
import brandSvc from "../../services/brand.service";
import { IResponseType } from "../../services/http.service";
import {
  IGetAllBannerProps,
  PaginationType,
} from "../../contracts/https-contracts";
import { brandColumns, IBrandData } from "./brand.contract";

const BrandList = () => {
  const [data, setData] = useState<Array<IBrandData>>();
  const [loading, setloading] = useState<boolean>(true);
  const [paginationData, setPaginationData] = useState<PaginationType>({
    total: 0,
    pageSize: 10,
    current: 1,
  });
  const [search, setSearch] = useState<string>();

  const handleTableChange = async (pagination: PaginationType) => {
    await getAllBrand({
      limit: pagination.pageSize,
      page: pagination.current,
    });
  };

  const getAllBrand = async ({
    page = paginationData.current,
    limit = paginationData.pageSize,
    search = null,
  }: IGetAllBannerProps) => {
    setloading(true);
    try {
      const { result }: IResponseType = await brandSvc.getRequest("/brand", {
        params: {
          limit: limit,
          page: page,
          search: search,
        },
      });
      setData(result.data as Array<IBrandData>);
      setPaginationData({
        total: result.options.total,
        pageSize: result.options.limit,
        current: result.options.page,
      });

      setloading(false);
    } catch (exception) {
      notify("Brand cannot  be fetch at this momemt", NotifyType.ERROR);
      setloading(false);
    }
  };

  useEffect(() => {
    getAllBrand({
      page: paginationData.current,
      limit: paginationData.pageSize,
    });
    if (brandColumns.length === 4) {
      brandColumns.push({
        title: "Actions",
        dataIndex: "_id",
        render: (value: string) => {
          return (
            <>
              <div className="flex gap-2">
                <NavLink
                  to={"/admin/brand/" + value}
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
                    className:
                      "bg-red-800! text-white! border-red-800! text-sm!",
                  }}
                  onConfirm={async (e) => {
                    try {
                      e?.preventDefault();
                      await brandSvc.deleteRequest("/brand/" + value);
                      notify("brand  deleted ", NotifyType.SUCCESS);
                      getAllBrand({ page: 1, limit: paginationData.pageSize });
                    } catch (exception) {
                      notify(
                        "brand cannot be deleted at this momemt",
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
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      getAllBrand({
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
            Brand List
          </Typography.Title>

          <NavLink
            to={"/admin/brand/create"}
            className={
              "flex gap-1 items-center justify-center bg-teal-700! p-1.5 h-10 text-white! rounded-md hover:bg-teal-900!"
            }
          >
            <AiOutlinePlus /> Add Brand
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
              columns={brandColumns}
              dataSource={data}
              loading={loading}
              rowKey={(record) => record._id}
              pagination={paginationData}
              onChange={handleTableChange}
              scroll={{ y: 600 }}
            />
          </div>
        </div>
      </Content>
    </>
  );
};

export default BrandList;
