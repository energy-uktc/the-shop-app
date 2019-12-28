import React, { useState, useCallback, useReducer } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Alert
} from "react-native";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Colors from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import LoadingControl from "../../components/UI/LoadingControl";

const FORM_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedInputValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedInputValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedInputValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
    }

    return {
      inputValues: updatedInputValues,
      inputValidities: updatedInputValidities,
      formIsValid: updatedFormIsValid
    };
  } else {
    return state;
  }
};

const AuthScreen = props => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputIsValid) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputIsValid,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const authHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert(
        "Validation Error",
        "Please enter valid authentication information!",
        [{ text: "OK" }]
      );
      return;
    }
    try {
      setIsLoading(true);
      if (isSignup) {
        await dispatch(
          authActions.signup(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
      } else {
        await dispatch(
          authActions.login(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
      }

      props.navigation.navigate("Shop");
    } catch (err) {
      setIsLoading(false);
      Alert.alert(`Error ${isSignup ? "sing up" : "login"}`, `${err}`, [
        { text: "OK" }
      ]);
    }
  }, [dispatch, isSignup, formState]);

  // if (isLoading) {
  //   return <LoadingControl />;
  // }
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <LinearGradient
        style={styles.gradient}
        colors={["#D9C9D0", "#D4C7CD", "#EAD1DC"]}
      >
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              onSubmitEditing={() => {
                this.passwordInput.focus();
              }}
              autoCapitalize="none"
              autoCorrect={false}
              validationText="Please enter valid email"
              label="E-Mail"
              onInputChange={inputChangeHandler}
              required={true}
              email
            />
            <Input
              id="password"
              childRef={ref => (this.passwordInput = ref)}
              onSubmitEditing={() => {}}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              validationText="Please enter valid password"
              label="Password"
              onInputChange={inputChangeHandler}
              required={true}
              minLength={5}
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <LoadingControl />
              ) : (
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
