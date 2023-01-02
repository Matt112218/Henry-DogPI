import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pageMinusAction, pagePlusAction } from "../../redux/actions";
import style from "./paging.module.css";

const Paging = (props) => {
  const page = useSelector((state) => state.page);
  const lastPage = useSelector((state) => state.lastPage);
  const dispatch = useDispatch();

  const pageMinusHandler = () => {
    dispatch(pageMinusAction());
  };
  const pagePlusHandler = () => {
    dispatch(pagePlusAction());
  };

  useEffect(() => {}, [page]);
  return (
    <div>
      <button
        id="pageMinus"
        disabled={page <= 1}
        onClick={pageMinusHandler}
        className={style.pagingButton}
      >
        Prev
      </button>
      <span className={style.page}>{page}</span>
      <button
        id="pagePlus"
        disabled={lastPage}
        onClick={pagePlusHandler}
        className={style.pagingButton}
      >
        Next
      </button>
    </div>
  );
};

export default Paging;
