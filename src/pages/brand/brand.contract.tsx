import { Button } from "antd";
import { IImagedata } from "../../contracts/https-contracts";
import { NavLink } from "react-router";

export interface IBrandData {
  _id: string;
  id: string;
  title: string;
  url: string;
  status: string;
  image: IImagedata;
  createdAt: Date;
  updatedAt: Date;
}
export const brandColumns = [
  {
    title: "Name",
    dataIndex: "title",
  },
  {
    title: "Url",
    dataIndex: "slug",
    render: (value: string) => (
      <NavLink
        to={"/brand-detail/" + value}
        target="_brand"
        className={"text-teal-700 underline italic"}
      >
        /{"brand-detail/" + value}
      </NavLink>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (value: string) => (
      <Button variant="filled" color={value === "active" ? "green" : "red"}>
        {value === "active" ? "Published" : "Un-Published"}
      </Button>
    ),
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (value: IImagedata) => (
      <img src={value.url} alt="" className="w-10 h-10 rounded-full" />
    ),
  },
];
