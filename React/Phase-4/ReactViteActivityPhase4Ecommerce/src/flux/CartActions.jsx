import AppDispatcher from "./AppDispatcher";

export const addToCart = (product) => {
  AppDispatcher.dispatch({
    type: "ADD_TO_CART",
    payload: product
  });
};

export const increaseQty = (id) => {
  AppDispatcher.dispatch({
    type: "INCREASE_QTY",
    payload: id
  });
};

export const decreaseQty = (id) => {
  AppDispatcher.dispatch({
    type: "DECREASE_QTY",
    payload: id
  });
};

export const removeFromCart = (id) => {
  AppDispatcher.dispatch({
    type: "REMOVE_FROM_CART",
    payload: id
  });
};
