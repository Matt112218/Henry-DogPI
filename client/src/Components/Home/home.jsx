import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./home.module.css";

import { getAllBreeds, getTemperaments } from "../../redux/actions";

import Loading from "../Loading/loading";
import Filtered from "../Filtered/Filtered";
import Results from "../searchBar/Results";
import Created from "../Created/Created";
import AllBreeds from "../AllBreeds/AllBreeds";
import Paging from "../Paging/Paging";
import NotFound from "../notFound/NotFound";

const Home = () => {
  // eslint-disable-next-line
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.breeds);
  const error = useSelector((state) => state.error);
  const filtered = useSelector((state) => state.filtered);
  const searched = useSelector((state) => state.searched);
  const created = useSelector((state) => state.created);

  useEffect(() => {
    dispatch(getAllBreeds());
    dispatch(getTemperaments());
  }, [dispatch]);

  if (error) {
    if (error.includes("Not Found")) {
      return (
        <div>
          <NotFound />
        </div>
      );
    } else {
      return (
        <div>
          <h4>{error}</h4>
          {console.log(error)}
        </div>
      );
    }
  } else if (!breeds.array.length) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else if (searched.array.length) {
    return (
      <div className={style.infoHolder}>
        <h1>HOME</h1>
        <Paging />
        <Results />
        <Paging />
      </div>
    );
  } else if (created.array.length) {
    return (
      <div className={style.infoHolder}>
        <h1>HOME</h1>
        <Paging />
        <Created />
        <Paging />
      </div>
    );
  } else if (!filtered.array.length) {
    return (
      <div className={style.infoHolder}>
        <h1>HOME</h1>
        <Paging />
        <AllBreeds />
        <Paging />
      </div>
    );
  } else {
    return (
      <div className={style.infoHolder}>
        <h1>HOME</h1>
        <Paging />
        <Filtered />
        <Paging />
      </div>
    );
  }
};

export default Home;
