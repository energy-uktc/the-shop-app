import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    let loadedOrders = [];
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://rn-complete-guide-4f17e.firebaseio.com/${userId}/orders.json`
    );

    if (!response.ok) {
      throw new Error(
        `Something went wrong. ${
          response.statusText ? response.statusText : ""
        }`
      );
    }

    const resData = await response.json();

    for (const key in resData) {
      loadedOrders.push(
        new Order(
          key,
          resData[key].items,
          resData[key].totalAmount,
          resData[key].date
        )
      );
    }

    dispatch({ type: SET_ORDERS, orders: loadedOrders });
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    await refreshTokenIfExpired(dispatch, getState);
    const tokenId = getState().auth.idToken;
    const userId = getState().auth.userId;
    const orderDate = new Date();
    const response = await fetch(
      `https://rn-complete-guide-4f17e.firebaseio.com/${userId}/orders.json?auth=${tokenId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount,
          date: orderDate
        })
      }
    );
    if (!response.ok) {
      throw new Error(
        `Something went wrong. ${
          response.statusText ? response.statusText : ""
        }`
      );
    }
    const resData = await response.json();
    dispatch({
      type: ADD_ORDER,
      items: cartItems,
      amount: totalAmount,
      date: orderDate,
      id: resData.name
    });
  };
};
