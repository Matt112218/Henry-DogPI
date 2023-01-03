import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { maxPage } from "../../redux/actions";
import default_image from "../../images/default.png";
import style from "./AllBreeds.module.css";

import Card from "../card/card";
import Filters from "../Filters/Filters";

const AllBreeds = () => {
  const breeds = useSelector((state) => state.breeds);
  const page = useSelector((state) => state.page);
  const paged = breeds.array.slice(8 * (page - 1), 8 * page);
  const dispatch = useDispatch();

  const module = breeds.array.length % 8;
  useEffect(() => {
    if (module === paged.length) {
      dispatch(maxPage(true));
    } else {
      dispatch(maxPage(false));
    }
  }, [dispatch, module, paged.length]);
  paged.forEach((each) => {
    if (!each.image) {
      each["image"] = default_image;
    }
  });

  breeds.array.forEach((each) => {
    if (each.Temperaments) {
      console.log("cambio");
      each["temperament"] = each["Temperaments"];
    }
  });

  return (
    <div className={style.mainContainer}>
      <Filters array="breeds" className={style.filter} />
      <div className={paged.length <= 4 ? style.minusFour : style.cardsHolder}>
        {paged.map((breed) => {
          return (
            <div key={breed.id}>
              <Card
                id={breed.id}
                img={breed.image}
                name={breed.name}
                temp={breed.temperament}
                weight={breed.weight}
                key={breed.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllBreeds;
