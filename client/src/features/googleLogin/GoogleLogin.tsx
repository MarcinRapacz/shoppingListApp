import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin as GL } from "react-google-login";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import * as AuthAPI from "../../api/auth";
import * as auth from "../auth/authSlice";
import * as alert from "../alert/alertSlice";
import "./GoogleLogin.scss";

const GoogleLogin: React.FC = () => {
  const dispatch = useDispatch();
  const responseGoogle = async (googleResponse: any) => {
    try {
      const apiResponse = await AuthAPI.google({
        idToken: googleResponse.tokenId,
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
    <GL
      clientId={process.env.REACT_APP_GOOGLE_APP_ID as string}
      buttonText="Login"
      autoLoad={false}
      onSuccess={responseGoogle}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <Button
          className="btn-block GoogleLogin"
          type="button"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <FontAwesomeIcon icon={faGoogle} />
        </Button>
      )}
    />
  );
};

export default GoogleLogin;
