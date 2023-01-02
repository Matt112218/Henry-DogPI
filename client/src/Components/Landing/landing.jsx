import React from "react";
import { Link } from "react-router-dom";
import landing from "../../images/ClipartKey_126554.png";
import style from "./landing.module.css";

const Landing = () => {
  return (
    <div className={style.landing}>
      <div className={style.texts}>
        <h1 className={style.title}>Dogs Landing Page</h1>
        <h2 className={style.subtitle}>Welcome!</h2>
        <Link to="/home" className={style.link}>
          Let's begin
        </Link>
      </div>
      <div className={style.image}>
        <img src={landing} alt="landing" className={style.landingImage} />
      </div>
    </div>
  );
};

export default Landing;
