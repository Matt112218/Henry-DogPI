import React from "react";
import loading from "../../images/loading-dog.gif";
import style from "./loading.module.css";

const Loading = (props) => {
  return (
    <div>
      <img
        src={loading}
        alt="loading"
        className={props.noNavbar ? style.noNavbar : style.loading}
      />
    </div>
  );
};

export default Loading;
