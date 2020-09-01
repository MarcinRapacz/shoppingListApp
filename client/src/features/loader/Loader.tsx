import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { IStore } from "../../app/store";
import "./Loader.scss";

const Loader: React.FC = () => {
  const { active } = useSelector((s: IStore) => s.loader);

  if (!active) return null;

  return (
    <section className="Loader">
      <div className="loader">
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    </section>
  );
};

export default Loader;
