import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import * as productActions from "../../store/actions/products";
import Input from "../../components/UI/Input";
import Colors from "../../constants/colors";

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

const EditProductScreen = props => {
  const productId = props.navigation.getParam("productId");

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(item => item.id === productId)
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      price: editedProduct ? editedProduct.price : 0.0,
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : ""
    },
    inputValidities: {
      title: editedProduct ? true : false,
      price: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
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
  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert(
        "Validation Error",
        "Please enter valid product information!",
        [{ text: "OK" }]
      );
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      if (editedProduct) {
        await dispatch(
          productActions.updateProduct(
            productId,
            formState.inputValues.title,
            +formState.inputValues.price,
            formState.inputValues.imageUrl,
            formState.inputValues.description
          )
        );
      } else {
        await dispatch(
          productActions.createProduct(
            formState.inputValues.title,
            +formState.inputValues.price,
            formState.inputValues.imageUrl,
            formState.inputValues.description
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ text: "Okay" }]);
    }
  }, [error]);
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            onSubmitEditing={() => {
              this.priceInput.focus();
            }}
            initialValue={formState.inputValues.title}
            autoCapitalize="sentences"
            autoCorrect={false}
            returnKeyType="next"
            initiallyValid={formState.inputValidities.title}
            validationText="Please enter valid title"
            label="Title"
            onInputChange={inputChangeHandler}
            required={true}
          />
          <Input
            id="price"
            childRef={ref => (this.priceInput = ref)}
            onSubmitEditing={() => {
              this.imageInput.focus();
            }}
            initialValue={(+formState.inputValues.price).toFixed(2)}
            min={0.01}
            keyboardType="decimal-pad"
            initiallyValid={formState.inputValidities.price}
            validationText="Please enter valid price"
            label="Price"
            onInputChange={inputChangeHandler}
          />
          <Input
            id="imageUrl"
            childRef={ref => (this.imageInput = ref)}
            onSubmitEditing={() => {
              this.descriptionInput.focus();
            }}
            initialValue={formState.inputValues.imageUrl}
            initiallyValid={formState.inputValidities.imageUrl}
            validationText="Please enter valid image URL"
            label="Image Url"
            onInputChange={inputChangeHandler}
          />
          <Input
            id="description"
            childRef={ref => (this.descriptionInput = ref)}
            initialValue={formState.inputValues.description}
            initiallyValid={formState.inputValidities.description}
            validationText="Please enter a valid description"
            label="Description"
            onInputChange={inputChangeHandler}
            multiline={true}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = navData => {
  const submitHandler = navData.navigation.getParam("submit");

  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Products"
      : "Add Products",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitHandler}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 10
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default EditProductScreen;
