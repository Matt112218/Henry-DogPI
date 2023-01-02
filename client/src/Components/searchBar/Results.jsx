import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { maxPage } from "../../redux/actions";
import Card from "../card/card";
import NotFound from "../notFound/NotFound";
import default_image from "../../images/default.png";
import Filters from "../Filters/Filters";
import style from "./results.module.css";

const Results = () => {
  const searched = useSelector((state) => state.searched);
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  const paged = searched.array.slice(8 * (page - 1), 8 * page);
  const module = searched.array.length % 8;

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

  if (searched.array.length > 0) {
    return (
      <div className={style.mainContainer}>
        <h1>SEARCHED BY "{searched.filter.toUpperCase()}"</h1>
        <p>QUANTITY: {searched.array.length}</p>
        <Filters array="searched" />

        <div
          key="results"
          className={paged.length <= 4 ? style.minusFour : style.cardsHolder}
        >
          {
            // eslint-disable-next-line
            paged.map((breed) => {
              if (breed.hasOwnProperty("id")) {
                return (
                  <div key={`${breed.id}-div`}>
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
  } else {
    return (
      <div>
        <h1>SEARCHED BY "{searched.filter.toUpperCase()}"</h1>
        <p>QUANTITY: {searched.array.length}</p>
        <NotFound />
      </div>
    );
  }
};

export default Results;
