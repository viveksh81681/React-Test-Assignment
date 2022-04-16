import { ADD_CITY } from "./action";

export const reducer = (store, { type, payload }) => {
  console.log("redux store", store.cities);
  switch (type) {
    case ADD_CITY:
      return { ...store, cities: payload };

    default:
      return store;
  }
};