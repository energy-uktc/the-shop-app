import React from "react";
import {
  FlatList,
  Button,
  View,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Color from "../../constants/colors";

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title
    });
  };
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        return (
          <ProductItem
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
            OnSelect={() => {
              selectItemHandler(item.id, item.title);
            }}
          >
            <Button
              color={Color.primary}
              title="Details"
              onPress={() => selectItemHandler(item.id, item.title)}
            />
            <Button
              color={Color.primary}
              title="Add to Cart"
              onPress={() => {
                dispatch(cartActions.addToCart(item));
              }}
            />
          </ProductItem>
        );
      }}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
