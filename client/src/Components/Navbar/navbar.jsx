import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";
import style from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={style.navbar}>
      <ul className={style.list}>
        <li className={style.item}>
          <Link to="/home" className={style.link}>
            HOME
          </Link>
        </li>
        <li className={style.item}>
          <Link to="/home/create" className={style.link}>
            CREATE
          </Link>
        </li>
      </ul>
      <SearchBar className={style.searchBar} />
    </div>
  );
};

export default Navbar;
