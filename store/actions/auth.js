import { AsyncStorage } from "react-native";
export const AUTHENTICATE = "AUTHENTICATE";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

export const storeAuthentication = (idToken, userId, email, expirationDate) => {
  return {
    type: AUTHENTICATE,
    email: email,
    idToken: idToken,
    userId: userId,
    expirationDate: expirationDate
  };
};

export const refreshToken = refreshToken => {
  return async dispatch => {
    const requestDate = new Date();

    const response = await fetch(
      "https://securetoken.googleapis.com/v1/token?key=AIzaSyBZNDgZLIPSnEkK4mesJUhATDNMc0QCclI",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          grant_type: "refresh_token",
          refresh_token: refreshToken
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      let message = "Something went wrong";
      switch (errorData.error.message) {
        case "TOKEN_EXPIRED":
          message = "Credentials are no longer valid. Please sign in again.";
          break;
        case "MISSING_REFRESH_TOKEN":
          message = "No refresh token provided.";
          break;
      }
      throw new Error(message);
    }

    const respData = await response.json();

    const expirationDate = new Date(
      requestDate.getTime() + parseInt(respData.expires_in) * 1000
    ).toISOString();

    dispatch({
      type: REFRESH_TOKEN,
      idToken: respData.id_token,
      expirationDate: expirationDate
    });

    await AsyncStorage.mergeItem(
      "userData",
      JSON.stringify({
        idToken: respData.id_token,
        refreshToken: respData.refresh_token,
        expirationDate: expirationDate
      })
    );
  };
};
export const signup = (email, password) => {
  return async dispatch => {
    const requestDate = new Date();

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZNDgZLIPSnEkK4mesJUhATDNMc0QCclI",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      let message = "Something went wrong";
      switch (errorData.error.message) {
        case "EMAIL_EXISTS":
          message = "Email already used!";
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          message =
            "We have blocked all requests from this device due to unusual activity. Try again later.";
          break;
      }
      throw new Error(message);
    }

    const respData = await response.json();

    const expirationDate = new Date(
      requestDate.getTime() + parseInt(respData.expiresIn) * 1000
    ).toISOString();

    dispatch(
      storeAuthentication(
        respData.idToken,
        respData.localId,
        respData.email,
        expirationDate
      )
    );

    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        userId: respData.localId,
        idToken: respData.idToken,
        email: respData.email,
        refreshToken: respData.refreshToken,
        expirationDate: expirationDate
      })
    );
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const requestDate = new Date();
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZNDgZLIPSnEkK4mesJUhATDNMc0QCclI",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      let message = "Something went wrong";
      switch (errorData.error.message) {
        case "EMAIL_NOT_FOUND":
          message = "Email does not exist!";
          break;
        case "INVALID_PASSWORD":
          message = "Password is not valid!";
          break;
        case "USER_DISABLED":
          message = "Account has been disabled!";
          break;
      }
      throw new Error(message);
    }

    const respData = await response.json();
    const expirationDate = new Date(
      requestDate.getTime() + parseInt(respData.expiresIn) * 1000
    ).toISOString();

    dispatch(
      storeAuthentication(
        respData.idToken,
        respData.localId,
        respData.email,
        expirationDate
      )
    );

    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        userId: respData.localId,
        idToken: respData.idToken,
        email: respData.email,
        refreshToken: respData.refreshToken,
        expirationDate: expirationDate
      })
    );
  };
};
