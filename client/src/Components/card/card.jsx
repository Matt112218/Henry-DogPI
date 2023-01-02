import React from "react";
import { Link } from "react-router-dom";
import style from "./card.module.css";

const Card = (props) => {
  return (
    <div className={style.cardContainer}>
      <h3>{props.name}</h3>
      <div>
        <img src={props.img} alt="each" className={style.image} />
        {/* {props.img} */}
      </div>
      <Link to={`/detail/${props.id}`} className={style.link}>
        DETAIL
      </Link>
      <div>
        <h3>Temperaments:</h3>
        <ul className={style.tempList}>
          {props.temp &&
            props.temp.map((each) => {
              return (
                <li className={style.tempLi} key={each}>
                  {each}
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        <span className={style.weight}>Weight: </span>
        <span>{parseInt(props.weight)}</span>
      </div>
      <hr />
    </div>
  );
};

export default Card;
