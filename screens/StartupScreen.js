import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import LoadingControl from "../components/UI/LoadingControl";
import { validateAuthentication, getUserData } from "../utils/authentication";
import * as authActions from "../store/actions/auth";

export default StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await validateAuthentication();
        const { idToken, userId, email, expirationDate } = await getUserData();
        dispatch(
          authActions.storeAuthentication(
            idToken,
            userId,
            email,
            expirationDate
          )
        );
        props.navigation.navigate("Shop");
      } catch (err) {
        console.log(err.message);
        props.navigation.navigate("Auth");
      }
    };
    checkAuth();
  }, [validateAuthentication, dispatch]);
  return <LoadingControl />;
};
