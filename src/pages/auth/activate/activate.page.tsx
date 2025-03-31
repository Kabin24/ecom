import { Spin } from "antd";
import { useEffect, useState } from "react";
import authSvc from "../../../services/auth.service";
import { useNavigate, useParams } from "react-router";
import { notify, NotifyType } from "../../../utilities/helpers";

const ActivatePage = () => {
  const [loading] = useState<boolean>(true);
  const params = useParams();
  const navigate = useNavigate();

  const activateUser = async () => {
    try {
      const result: any = await authSvc.getRequest(
        "/auth/activate/" + params.activationToken
      );
      notify(result.result.message, NotifyType.SUCCESS);
      navigate("/");
    } catch (exception) {
      console.log(exception);
      notify(
        "sorry your account cannot be activated  at this time",
        NotifyType.ERROR
      );
    } finally {
      navigate("/");
    }
  };
  useEffect(() => {
    activateUser();
  }, []);
  return (
    <>
      {loading ? <Spin fullscreen size="large" tip="loading..."></Spin> : <></>}
    </>
  );
};

export default ActivatePage;
