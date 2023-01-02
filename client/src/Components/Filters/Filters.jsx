import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./filters.module.css";
import {
  cleanFilterAction,
  cleanSearchAction,
  filterByCreated,
  filterByTemp,
  orderByName,
  orderByWeight,
  resetPages,
} from "../../redux/actions";

const Filters = (props) => {
  const { array } = props;
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const nameHandler = (event) => {
    const selection = event.target.value;
    dispatch(orderByName(selection, array));
    dispatch(resetPages());
  };

  const weightHandler = (event) => {
    const selection = event.target.value;
    dispatch(orderByWeight(selection, array));
    dispatch(resetPages());
  };

  const temperamentHandler = (event) => {
    const selection = event.target.value;
    dispatch(cleanFilterAction());
    dispatch(filterByTemp(selection, array));
    dispatch(resetPages());
    dispatch(cleanSearchAction());
  };

  const createdHandler = (event) => {
    const selection = event.target.value;

    dispatch(filterByCreated(selection, array));
    dispatch(resetPages());
  };
  return (
    <div>
      <div>
        <select onChange={nameHandler} id="Name" className={style.select}>
          <option>Order by name</option>
          <option value="asc">A-Z</option>
          <option value="dec">Z-A</option>
        </select>

        <select onChange={weightHandler} id="Weight" className={style.select}>
          <option>Order by weight</option>
          <option value="asc">ASC</option>
          <option value="dec">DEC</option>
        </select>

        <select onChange={createdHandler} id="Created" className={style.select}>
          <option>Select Existent or Created breeds</option>
          <option value="Existent">Existent</option>
          <option value="Created">Created</option>
        </select>

        <select
          onChange={temperamentHandler}
          id="Temperaments"
          className={style.select}
        >
          <option>Select a Temperament</option>
          {temperaments.map((each) => {
            return (
              <option value={each.name} key={each.name}>
                {each.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Filters;
