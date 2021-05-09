import React from 'react';

export const MainContext = React.createContext({
  count: { cart: null },
  setCount: () => null,
});
