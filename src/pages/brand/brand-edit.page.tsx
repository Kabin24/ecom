import { Spin, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import BrandForm, { IBrandData } from "./brand-form.component";
import brandSvc from "../../services/brand.service";
import { notify, NotifyType } from "../../utilities/helpers";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

const BrandEdit = () => {
  const navigate = useNavigate();
  const [brandData, setBrandData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();

  const editEvent = async (data: IBrandData) => {
    try {
      await brandSvc.patchRequest("/brand/" + params.id, data, {
        file: true,
      });

      notify("Brand edited successfully!!", NotifyType.SUCCESS);
      navigate("admin/brand");
    } catch (exception) {
      //   console.log(exception);
      //   notify(" brand cannot  be edited at this momemt", NotifyType.ERROR);
    }
  };
  const getDetailById = async () => {
    try {
      const { result } = await brandSvc.getRequest("/brand/" + params.id);
      setBrandData(result.data);
    } catch (exception) {
      // console.log(exception);

      notify("Brand cannot be fetch at  this moment!", NotifyType.ERROR);
      navigate("admin/brand");
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
            Brand Edit
          </Typography.Title>
        </div>

        <div className="flex flex-col gap-5">
          {loading ? (
            <Spin fullscreen></Spin>
          ) : (
            <>
              <BrandForm submitEvent={editEvent} brand={brandData} />
            </>
          )}
        </div>
      </Content>
    </>
  );
};

export default BrandEdit;
