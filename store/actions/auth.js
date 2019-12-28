export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signup = (email, password) => {
  return async dispatch => {
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

    dispatch({
      type: SIGNUP,
      email: respData.email,
      idToken: respData.idToken,
      userId: respData.localId
    });
  };
};

export const login = (email, password) => {
  return async dispatch => {
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
    dispatch({
      type: LOGIN,
      email: respData.email,
      idToken: respData.idToken,
      userId: respData.localId
    });
  };
};
