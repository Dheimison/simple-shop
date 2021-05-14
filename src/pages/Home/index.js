import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { SearchBox, Stack } from '@fluentui/react';
import { useHistory } from 'react-router-dom';

import { CustomBreadcrumb } from 'components/CustomBreadcrumb';
import { NoItemsFound } from 'components/NoItemsFound';
import { useLocalStorage } from 'hooks';
import { normalizeString } from 'helpers';
import { MainContext } from 'contexts';
import { ProductTable } from './components/ProductTable';

export function Home() {
  const { setCount } = useContext(MainContext);
  const history = useHistory();
  const [products] = useLocalStorage('product', []);
  const [currentProducts, setCurrentProduct] = useState([]);
  const [cartItems, setCart] = useLocalStorage('cart', []);

  useEffect(() => {
    setCurrentProduct(products);
  }, [products]);

  function handleAddProductToCart(product) {
    const allCartItems = [...cartItems];

    allCartItems.unshift(product);

    setCart(allCartItems);
    setCount((prevState) => ({ ...prevState, cart: allCartItems.length }));
  }

  function searchProducts(value) {
    if (products.length > 0) {
      setCurrentProduct(
        value
          ? products.filter(
              (item) =>
                normalizeString(item.name.toLowerCase()).indexOf(
                  normalizeString(value.toLowerCase())
                ) > -1
            )
          : products
      );
    }
  }

  return (
    <Stack
      tokens={{ padding: '10px 30px', childrenGap: 10 }}
      style={{ height: '100%' }}
    >
      <Helmet>
        <title>Paginal Inicial - S-Shop</title>
        <meta name="description" content="Paginal Inicial do S-Shop" />
      </Helmet>

      <Stack
        horizontal
        horizontalAlign="space-between"
        verticalAlign="end"
        wrap
        tokens={{ childrenGap: 10 }}
      >
        <Stack.Item grow>
          <CustomBreadcrumb pathname={history.location.pathname} />
        </Stack.Item>

        <SearchBox
          onSearch={(newValue) => searchProducts(newValue)}
          onChange={(_, newValue) => {
            searchProducts(newValue);
          }}
        />
      </Stack>

      {currentProducts.length > 0 ? (
        <ProductTable
          products={currentProducts}
          addProductToCart={handleAddProductToCart}
        />
      ) : (
        <Stack verticalAlign="center" style={{ height: '100%' }}>
          <NoItemsFound
            text="Nenhum produto encontrado"
            iconName="ProductList"
            iconAreaLabel="Icone de um produto"
          />
        </Stack>
      )}
    </Stack>
  );
}
