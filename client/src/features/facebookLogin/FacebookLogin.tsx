import React from "react";
import { useDispatch } from "react-redux";
import FacebookLogin from "react-facebook-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { Response } from "./IFacebookLogin";
import * as AuthAPI from "../../api/auth";
import * as auth from "../auth/authSlice";
import * as alert from "../alert/alertSlice";
import "./FacebookLogin.scss";

const FacebookAuth: React.FC = () => {
  const dispatch = useDispatch();

  const responseFacebook = async (facebookResponse: Response) => {
    try {
      const apiResponse = await AuthAPI.facebook({
        id: facebookResponse.id,
        accessToken: facebookResponse.accessToken,
        signedRequest: facebookResponse.signedRequest,
      });

      const { token, message } = apiResponse.data;
      dispatch(alert.show({ message, status: "success" }));
      dispatch(auth.set(token));
    } catch (error) {
      alert.show({
        message: error.response.data.message,
        status: "danger",
      });
      dispatch(auth.reset());
    }
  };

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID as string}
      fields="name,email,picture"
      callback={responseFacebook}
      textButton=""
      icon={<FontAwesomeIcon icon={faFacebookF} />}
      cssClass="btn btn-block FacebookLogin"
    />
  );
};

export default FacebookAuth;
