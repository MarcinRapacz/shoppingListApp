import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPauseCircle,
  faPlayCircle,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Status.scss";

interface Props {
  status: string;
  onClick?: (status: string) => void;
}

const AWAITING = "awaiting";
const ACTIVE = "active";

const generateIcon = (status: string) => {
  switch (status) {
    case AWAITING:
      return faPlayCircle;

    case ACTIVE:
      return faPauseCircle;

    default:
      return faQuestionCircle;
  }
};

const Status: React.FC<Props> = (props: Props) => {
  const { status, onClick } = props;
  const icon = generateIcon(status);

  const handleClick = () => {
    if (!onClick) return;

    if (status === AWAITING) onClick(ACTIVE);
    if (status === ACTIVE) onClick(AWAITING);
  };

  return (
    <section className={`Status ${status}`} onClick={handleClick}>
      <FontAwesomeIcon icon={icon} />
    </section>
  );
};

export default Status;
