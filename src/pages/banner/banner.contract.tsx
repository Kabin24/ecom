import { Button } from "antd";
import { IImagedata } from "../../contracts/https-contracts";

export interface IBannerData {
  id: string;
  title: string;
  url: string;
  status: string;
  image: IImagedata;
  createdAt: Date;
  updatedAt: Date;
}
export const bannerColumns = [
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
      <Button variant="filled" color={value === "active" ? "green" : "red"}>
        {value === "active" ? "Published" : "Un-Published"}
      </Button>
    ),
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (value: IImagedata) => (
      <img src={value.url} alt="" className="w-25" />
    ),
  },
];
