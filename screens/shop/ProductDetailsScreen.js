import React from "react";
import { useSelector } from "react-redux";
import { ScrollView, View, Text, StyleSheet } from "react-native";

const ProductOverviewScreen = props => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(item => item.id === productId)
  );
  return (
    <View style={styles.screen}>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

ProductOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("productTitle")
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProductOverviewScreen;
