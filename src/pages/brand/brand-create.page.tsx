import { Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import BrandForm, { IBrandData } from "./brand-form.component";
import brandSvc from "../../services/brand.service";
import { notify, NotifyType } from "../../utilities/helpers";
import { useNavigate } from "react-router";

const BrandCreate = () => {
  const navigate = useNavigate();
  const createEvent = async (data: IBrandData) => {
    try {
      await brandSvc.postRequest("/brand", data, {
        file: true,
      });
      notify("Brand created successfully!!", NotifyType.SUCCESS);
      navigate("/admin/brand");
    } catch (exception) {
      console.log(exception);
      notify(" brand cannot  be created at this momemt", NotifyType.ERROR);
    }
  };
  return (
    <>
      <Content className="bg-white! m-5 p-5">
        <div className="flex justify-between border-b border-b-gray-200 ">
          <Typography.Title className="text-teal-700! underline underline-offset-4">
            Brand Create
          </Typography.Title>
        </div>

        <div className="flex flex-col gap-5">
          <BrandForm submitEvent={createEvent} />
        </div>
      </Content>
    </>
  );
};

export default BrandCreate;
