import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../card/card";
import { cleanFilterAction, maxPage, resetPages } from "../../redux/actions";
import default_image from "../../images/default.png";
import Filters from "../Filters/Filters";
import style from "./Created.module.css";

const Created = () => {
  const dispatch = useDispatch();
  const created = useSelector((state) => state.created);
  const page = useSelector((state) => state.page);

  const cleanFilter = () => {
    dispatch(cleanFilterAction());
    dispatch(resetPages());
  };
  const filter = created.filter;
  const paged = created.array.slice(8 * (page - 1), 8 * page);
  const module = created.array.length % 8;
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
  return (
    <div className={style.mainContainer}>
      <h1>FILTERED BY {filter.toUpperCase()} </h1>
      <button type="reset" onClick={cleanFilter}>
        Clean Filter
      </button>
      <p>QUANTITY: {created.array.length}</p>
      <Filters array="created" />

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

export default Created;
