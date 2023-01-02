import axios from "axios";

//Obtainers & ERROR
export const NOT_FOUND = "NOT_FOUND";
export const ERROR = "ERROR";
export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const BREED_BY_ID = "BREED_BY_ID";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const SEARCHED_BREEDS = "SEARCHED_BREEDS";

export const getAllBreeds = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/dogs");

      dispatch({
        type: GET_ALL_BREEDS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};
export const getBreedById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/dogs/${id}`);

      dispatch({
        type: BREED_BY_ID,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};
export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/temperament`);
      dispatch({
        type: GET_TEMPERAMENTS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};
export const searchBreedsAction = (payload) => {
  return {
    type: SEARCHED_BREEDS,
    payload,
  };
};

export const notFound = () => {
  return {
    type: NOT_FOUND,
  };
};
//Obteiners & ERROR -END-

//Organizer
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";

export const orderByName = (payload, array) => {
  return {
    type: ORDER_BY_NAME,
    payload,
    array,
  };
};
export const orderByWeight = (payload, array) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
    array,
  };
};
//Organizer -END-

//Filters
export const FILTER_BY_TEMP = "FILTER_BY_TEMP";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";

export const filterByTemp = (payload, array) => {
  return {
    type: FILTER_BY_TEMP,
    payload,
    array,
  };
};
export const filterByCreated = (payload, array) => {
  return {
    type: FILTER_BY_CREATED,
    payload,
    array,
  };
};
//Filters -END-

//Clenears
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const CLEAN_FILTER = "CLEAN_FILTER";
export const CLEAN_SEARCH = "CLEAN_SEARCH";

export const cleanFilterAction = () => {
  return {
    type: CLEAN_FILTER,
  };
};
export const cleanSearchAction = () => {
  return {
    type: CLEAN_SEARCH,
  };
};
export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
  };
};
//Cleaners -END-

//Paginated
export const PAGE_PLUS = "PAGE_PLUS";
export const PAGE_MINUS = "PAGE_MINUS";
export const RESET_PAGES = "RESET_PAGES";
export const MAX_PAGES = "MAX_PAGES";

export const pagePlusAction = () => {
  return {
    type: PAGE_PLUS,
  };
};
export const pageMinusAction = () => {
  return {
    type: PAGE_MINUS,
  };
};
export const resetPages = () => {
  return {
    type: RESET_PAGES,
  };
};
export const maxPage = (payload) => {
  return {
    type: MAX_PAGES,
    payload,
  };
};
//Paginated -END-
