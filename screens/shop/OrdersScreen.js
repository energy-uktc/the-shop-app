import React, { useState, useCallback, useEffect } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Platform,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as orderActions from "../../store/actions/order";
import LoadingControl from "../../components/UI/LoadingControl";

const OrdersScreen = props => {
  const orders = useSelector(state => state.order.orders);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(orderActions.fetchOrders());
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  }, [setError, setIsLoading, dispatch]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    const willFocusEvent = props.navigation.addListener("willFocus", () => {
      loadOrders();
    });
    return () => {
      willFocusEvent.remove();
    };
  }, [loadOrders]);

  if (isLoading) {
    return <LoadingControl />;
  }

  if (!isLoading && error) {
    return (
      <View style={styles.centered}>
        <Text>Orders can not be loaded at the moment.{error.message}</Text>
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
      data={orders}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <OrderItem order={item} />}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red"
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Orders",
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
    )
  };
};
export default OrdersScreen;
