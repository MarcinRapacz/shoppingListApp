import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { IMember } from "./IMember";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import * as MemberAPI from "../../api/member";
import * as AlertActions from "../alert/alertSlice";

interface Props {
  members: IMember[];
  handleVisibility: (isVisible: boolean) => void;
}

const MemberList: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();

  const handleHideMemberContainer = () => {
    props.handleVisibility(false);
  };

  const handleRemoveMember = async (email: string) => {
    try {
      const response = await MemberAPI.toggle(params.id, { email });

      dispatch(
        AlertActions.show({ message: response.data.message, status: "success" })
      );
      handleHideMemberContainer();
    } catch (error) {
      dispatch(
        AlertActions.show({
          message: error.response.data.message,
          status: "danger",
        })
      );
    }
  };

  return (
    <section className={`MemberList p-0`}>
      <h4>Lista członków</h4>
      {props.members.map((member) => (
        <div
          key={member._id}
          className={`d-flex justify-content-between align-items-center my-2`}
        >
          <span>{member.name || member.email}</span>
          <Button
            className="mx-1"
            onClick={() => handleRemoveMember(member.email)}
            variant="outline-danger"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </div>
      ))}
    </section>
  );
};

export default MemberList;
