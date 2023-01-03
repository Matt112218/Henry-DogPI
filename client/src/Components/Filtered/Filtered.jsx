import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../card/card";
import { cleanFilterAction, maxPage, resetPages } from "../../redux/actions";
import default_image from "../../images/default.png";
import Filters from "../Filters/Filters";
import style from "./Filtered.module.css";

const Filteder = () => {
  const dispatch = useDispatch();
  const filtered = useSelector((state) => state.filtered);
  const page = useSelector((state) => state.page);
  const paged = filtered.array.slice(8 * (page - 1), 8 * page);

  const module = filtered.array.length % 8;
  const cleanFilter = () => {
    dispatch(cleanFilterAction());
    dispatch(resetPages());
  };
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

  filtered.array.forEach((each) => {
    if (each.Temperaments) {
      console.log("cambio");
      each["temperament"] = each["Temperaments"];
    }
  });

  return (
    <div className={style.mainContainer}>
      <h1>FILTERED BY {filtered.filter.toUpperCase()}</h1>
      <button type="reset" onClick={cleanFilter}>
        Clean Filter
      </button>
      <p>QUANTITY: {filtered.array.length}</p>
      <Filters array="filtered" />
      <div className={paged.length <= 4 ? style.minusFour : style.cardsHolder}>
        {
          // eslint-disable-next-line
          paged.map((breed) => {
            if (breed.hasOwnProperty("id")) {
              return (
                <div>
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
            }
          })
        }
      </div>
    </div>
  );
};

export default Filteder;
