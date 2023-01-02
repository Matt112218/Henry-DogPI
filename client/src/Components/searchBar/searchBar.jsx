import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import style from "./searchbar.module.css";
import {
  cleanFilterAction,
  cleanSearchAction,
  notFound,
  resetPages,
  searchBreedsAction,
} from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  const cleanSearch = (event) => {
    event.preventDefault();
    dispatch(cleanSearchAction());
    dispatch(resetPages());
    dispatch(cleanFilterAction());
  };
  const searchBreeds = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `http://localhost:3001/dogs?name=${search}`
    );
    const { data } = response;
    if (response.data.error) {
      dispatch(notFound());
    } else {
      const aux = { filter: search, array: data };
      console.log(response);
      dispatch(searchBreedsAction(aux));
    }
    dispatch(resetPages());
  };

  return (
    <div>
      <form onSubmit={searchBreeds}>
        <input
          name="search"
          type="text"
          placeholder="Search..."
          onChange={searchHandler}
          value={search.name}
          className={style.search}
        />
        <button type="submit" className={style.search}>
          Search
        </button>
      </form>
      <div>
        <button onClick={cleanSearch}>Clean Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
