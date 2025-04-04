import { Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import BannerForm, { IBannerData } from "./banner-form.component";
import bannerSvc from "../../services/banner.service";
import { notify, NotifyType } from "../../utilities/helpers";
import { useNavigate } from "react-router";

const BannerCreate = () => {
  const navigate = useNavigate();
  const createEvent = async (data: IBannerData) => {
    try {
      const response = await bannerSvc.postRequest("/banner", data, {
        file: true,
      });
      notify("Banner created successfully!!", NotifyType.SUCCESS);
      navigate("/admin/banner");
    } catch (exception) {
      console.log(exception);
      notify(" banner cannot  be created at this momemt", NotifyType.ERROR);
    }
  };
  return (
    <>
      <Content className="bg-white! m-5 p-5">
        <div className="flex justify-between border-b border-b-gray-200 ">
          <Typography.Title className="text-teal-700! underline underline-offset-4">
            Banner Create
          </Typography.Title>
        </div>

        <div className="flex flex-col gap-5">
          <BannerForm submitEvent={createEvent} />
        </div>
      </Content>
    </>
  );
};

export default BannerCreate;
