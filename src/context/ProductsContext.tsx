import {createContext} from 'react';

export const ProductsContext = createContext({});

export const ProductsProvider = () => {
  return <ProductsContext.Provider></ProductsContext.Provider>;
};
