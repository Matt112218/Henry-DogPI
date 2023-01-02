import React from "react";
import style from "./notFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  const linkHandler = (event) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <div className={style.NotFound}>
      <h1>🙁 Oops!! Breed not Found</h1>
      <p>
        There's no breeds with your search in their names. Try with another
        search!
      </p>
      <Link onClick={linkHandler} className={style.link}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
