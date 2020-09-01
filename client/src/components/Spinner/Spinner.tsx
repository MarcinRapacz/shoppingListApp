import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Spinner.scss";

const Spinner: React.FC = () => {
  return (
    <section className="Spinner">
      <div className="loader">
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    </section>
  );
};

export default Spinner;
