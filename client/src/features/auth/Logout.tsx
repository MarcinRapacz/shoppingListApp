import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import * as AuthAction from "../auth/authSlice";

const Logout: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(AuthAction.reset());
  };

  return (
    <Button
      className="btn btn-block"
      variant="outline-danger"
      onClick={handleLogout}
    >
      <FontAwesomeIcon icon={faSignOutAlt} />
      <span> Wyloguj sie</span>
    </Button>
  );
};

export default Logout;
