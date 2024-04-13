import { createContext, useState, useEffect } from "react";
import SHOP_DATA from "../shop-data.json";

//actual value that we will acess
export const ProductsContext = createContext({
  products: [],
});

//provider component

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(SHOP_DATA);
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
