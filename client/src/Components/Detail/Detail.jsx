import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { cleanDetail, getBreedById } from "../../redux/actions";
import back_image from "../../images/back_image.png";
import Loading from "../Loading/loading";
import style from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  let breedById = useSelector((state) => state.breedByID);
  if (Array.isArray(breedById)) {
    breedById = breedById[0];
  }
  useEffect(() => {
    dispatch(getBreedById(id));
    return () => {
      dispatch(cleanDetail());
    }; // eslint-disable-next-line
  }, [dispatch]);

  if (!Object.keys(breedById).length) {
    return (
      <div>
        <Loading noNavbar="true" />
      </div>
    );
  } else {
    return (
      <div className={style.detailContainer}>
        <Link to="/home">
          <img src={back_image} alt="back_arrow" className={style.back_arrow} />
        </Link>
        <div className={style.imgDiv}>
          <img src={breedById.image} alt="each" className={style.imgDetail} />
        </div>
        <div className={style.textsDetail}>
          <h3 className={style.name}> "{breedById.name}" Detail</h3>
          <hr />
          <div>
            <p className={style.title}>Temperaments</p>
            <ul>
              {breedById.temperaments &&
                breedById.temperaments.map((each) => {
                  return <li key={each}>{each}</li>;
                })}
            </ul>
          </div>
          <hr />
          <p className={style.title}>Height</p>
          <p>{breedById.height}</p>
          <hr />
          <p className={style.title}>Weight</p>
          <p>{breedById.weight}</p>
          <hr />
          <p className={style.title}>Life Span</p>
          <p>{breedById.life_span}</p>
        </div>
      </div>
    );
  }
};
export default Detail;
