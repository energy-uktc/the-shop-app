import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ShopNavigator from "./ShopNavigator";
import { NavigationActions } from "react-navigation";
export default NavigationContainer = props => {
  let isAuth = useSelector(state => !!state.auth.idToken);
  const navRef = useRef();

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />;
};
