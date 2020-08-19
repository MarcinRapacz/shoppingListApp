import React from "react";
import { useSelector } from "react-redux";
import { Alert as BootstrapAlert } from "react-bootstrap";
import { IStore } from "../../app/store";
import "./Alert.scss";

const Alert: React.FC = () => {
  const { alert } = useSelector((state: IStore) => state);
  const { message, status } = alert;

  return (
    <BootstrapAlert className={`Alert `} variant={status} show={!!message}>
      {alert.message}
    </BootstrapAlert>
  );
};

export default Alert;
