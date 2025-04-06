import { Spin, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import BannerForm, { IBannerData } from "./banner-form.component";
import bannerSvc from "../../services/banner.service";
import { notify, NotifyType } from "../../utilities/helpers";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

const BannerEdit = () => {
  const navigate = useNavigate();
  const [bannerData, setBannerData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();

  const editEvent = async (data: IBannerData) => {
    try {
      await bannerSvc.putRequest("/banner/" + params.id, data, {
        file: true,
      });

      notify("Banner edited successfully!!", NotifyType.SUCCESS);
      navigate("/admin/banner");
    } catch (exception) {
      //   console.log(exception);
      //   notify(" banner cannot  be edited at this momemt", NotifyType.ERROR);
    }
  };
  const getDetailById = async () => {
    try {
      const { result } = await bannerSvc.getRequest("/banner/" + params.id);
      setBannerData(result.data);
    } catch (exception) {
      // console.log(exception);

      notify("Banner cannot be fetch at  this moment!", NotifyType.ERROR);
      navigate("admin/banner");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDetailById();
  }, []);
  return (
    <>
      <Content className="bg-white! m-5 p-5">
        <div className="flex justify-between border-b border-b-gray-200 ">
          <Typography.Title className="text-teal-700! underline underline-offset-4">
            Banner Edit
          </Typography.Title>
        </div>

        <div className="flex flex-col gap-5">
          {loading ? (
            <Spin fullscreen></Spin>
          ) : (
            <>
              <BannerForm submitEvent={editEvent} banner={bannerData} />
            </>
          )}
        </div>
      </Content>
    </>
  );
};

export default BannerEdit;
