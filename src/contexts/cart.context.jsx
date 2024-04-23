import { createContext, useState, useEffect } from "react";

const addProductToCart = (cartItems, productToAdd) => {
  //check if productToAdd already exists in cartItems
  const productexisted = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  //if exists, then increase the quantity by 1
  if (productexisted) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //if not exists, add productToAdd to cartItems array and return updated array
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  //find the cartItem to remove
  const productexisted = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  //if quantity is 1, remove item from cart
  if (productexisted.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemsToCart: () => {},
  cartCount: 0,
  removeItemsFromCart: () => {},
  clearItemFromCart: () => {},
  totalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    setTotalPrice(
      cartItems.reduce((acc, item) => {
        let itemPrice = item.quantity * item.price;
        return acc + itemPrice;
      }, 0)
    );
  }, [cartItems]);

  const addItemsToCart = (productToAdd) => {
    setCartItems(addProductToCart(cartItems, productToAdd));
  };

  const removeItemsFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemsToCart,
    cartCount,
    removeItemsFromCart,
    clearItemFromCart,
    totalPrice,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
