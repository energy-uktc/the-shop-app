import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Button,
  Text,
  StyleSheet,
  Platform,
  View,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";

import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Color from "../../constants/colors";
import LoadingControl from "../../components/UI/LoadingControl";

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);

    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err);
    }
  }, [setIsLoading, dispatch]);

  useEffect(() => {
    const willFocusEvent = props.navigation.addListener("willFocus", () => {
      loadProducts();
    });
    return () => {
      willFocusEvent.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [loadProducts]);
  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title
    });
  };

  if (isLoading) {
    return <LoadingControl />;
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>There is no items! Try add some</Text>
      </View>
    );
  }

  if (!isLoading && error) {
    return (
      <View style={styles.centered}>
        <Text>{error.message}</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Color.primary}
        />
      </View>
    );
  }
  return (
    <FlatList
      //onRefresh={loadProducts}
      //refreshing={isRefreshing}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={loadProducts}
          title="Pull to refresh"
          tintColor={Color.primary}
          titleColor={Color.primary}
          colors={[Color.primary]} //{Color.primary}
        />
      }
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        return (
          <ProductItem
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
            onSelect={() => {
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProductsOverviewScreen;
