import {
  GET_ALL_BREEDS,
  ERROR,
  BREED_BY_ID,
  CLEAN_DETAIL,
  GET_TEMPERAMENTS,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  SEARCHED_BREEDS,
  FILTER_BY_TEMP,
  FILTER_BY_CREATED,
  CLEAN_FILTER,
  CLEAN_SEARCH,
  PAGE_MINUS,
  PAGE_PLUS,
  RESET_PAGES,
  MAX_PAGES,
  NOT_FOUND,
} from "./actions";

const initialState = {
  breeds: { filter: "", array: [] },
  breedByID: {},
  error: "",
  temperaments: [],
  filtered: { filter: "", array: [] },
  created: { filter: "", array: [] },
  searched: { filter: "", array: [] },
  page: 1,
  lastPage: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BREEDS:
      return {
        ...state,
        breeds: { filter: "breeds", array: action.payload },
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case BREED_BY_ID:
      return {
        ...state,
        breedByID: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        breedByID: {},
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case ORDER_BY_NAME:
      let sortedName = { array: [] };
      const { array } = action;
      if (action.payload === "asc") {
        sortedName.array = state[action.array].array.sort((a, b) =>
          a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        );
      } else if (action.payload === "dec") {
        sortedName.array = state[action.array].array.sort((a, b) =>
          a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        );
      } else {
        return { ...state };
      }
      return {
        ...state,

        [action.array]: { ...state[array], ...sortedName },
      };
    case ORDER_BY_WEIGHT:
      let sortedWeight = { array: [] };

      if (action.payload === "asc") {
        sortedWeight.array = state[action.array].array.sort((a, b) =>
          a.weight < b.weight ? -1 : a.weight > b.weight ? 1 : 0
        );
      } else if (action.payload === "dec") {
        sortedWeight.array = state[action.array].array.sort((a, b) =>
          a.weight < b.weight ? 1 : a.weight > b.weight ? -1 : 0
        );
      } else {
        return { ...state };
      }
      return {
        ...state,
        [action.array]: { ...state[action.array], ...sortedWeight },
      };
    case FILTER_BY_TEMP:
      const aux = {};
      aux["filter"] = action.payload;
      aux["array"] = [];
      state.breeds.array.forEach((each) => {
        if (each.temperament && each.temperament.includes(action.payload)) {
          aux.array.push(each);
        }
      });
      return {
        ...state,
        filtered: { ...aux },
      };
    case FILTER_BY_CREATED:
      let auxCreated = {};
      auxCreated["filter"] = action.payload;
      auxCreated["array"] = [];
      state.breeds.array.forEach((each) => {
        if (each.id.length > 8) {
          auxCreated.array.push(each);
        }
      });
      if (action.payload === "Created") {
        return {
          ...state,
          created: { ...auxCreated },
        };
      } else {
        let auxExistent = {};
        auxExistent["filter"] = action.payload;
        auxExistent["array"] = [];
        state.breeds.array.forEach((each) => {
          if (each.id.toString().length < 8) {
            auxExistent.array.push(each);
          }
        });
        return {
          ...state,
          created: { ...auxExistent },
        };
      }
    case CLEAN_FILTER:
      return {
        ...state,
        filtered: { filter: "", array: [] },
        created: { filter: "", array: [] },
      };
    case CLEAN_SEARCH:
      return {
        ...state,
        searched: { filter: "", array: [] },
      };
    case SEARCHED_BREEDS:
      return {
        ...state,
        searched: action.payload,
      };
    case PAGE_PLUS:
      return {
        ...state,
        page: parseInt(state.page) + 1,
      };
    case PAGE_MINUS:
      return {
        ...state,
        page: parseInt(state.page) - 1,
      };
    case RESET_PAGES:
      return {
        ...state,
        page: 1,
      };
    case MAX_PAGES:
      return {
        ...state,
        lastPage: action.payload,
      };
    case NOT_FOUND:
      return {
        ...state,
        error: "Breed Not Found",
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
