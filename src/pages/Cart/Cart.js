import { Helmet } from 'react-helmet';
import { useContext, useState } from 'react';
import { PrimaryButton, Stack, TextField } from '@fluentui/react';
import { useHistory } from 'react-router-dom';

import { CustomBreadcrumb } from 'components/CustomBreadcrumb';
import { NoItemsFound } from 'components/NoItemsFound';
import { useLocalStorage } from 'hooks';
import { formatCurrencyNumberToBRL } from 'helpers';
import { MainContext } from 'contexts';
import { ProductInCartTable } from './ProductInCartTable';

const nameErrorMessage = 'É necessário informar o nome do comprador.';

export function Cart() {
  const [name, setName] = useState(null);
  const [isTryingSubmit, setIsTryingSubmit] = useState(false);
  const [cartItems, setCart] = useLocalStorage('cart', []);
  const [, setOrders] = useLocalStorage('order', []);
  const { setCount } = useContext(MainContext);
  const history = useHistory();

  const amount = cartItems.reduce(
    (total, currentItem) => currentItem.quantity * currentItem.price + total,
    0
  );
  const quantityTotal = cartItems.reduce(
    (total, currentItem) => currentItem.quantity + total,
    0
  );

  function handleSubmitOrder() {
    setIsTryingSubmit(true);

    if (name && cartItems.length > 0) {
      setOrders((prevState) => [
        ...prevState,
        { username: name, items: cartItems, amount, quantityTotal },
      ]);
      setCount({ cart: 0 });
      setCart([]);
    }
  }

  function handleEditCart({ id, quantity }) {
    const allItems = [...cartItems];
    const itemIndex = allItems.findIndex((product) => product.id === id);

    allItems[itemIndex].quantity = quantity;

    setCart(allItems);
  }

  function handleDeleteProductInCart(productId) {
    const allItems = [...cartItems];
    const newCartItemsList = allItems.filter(
      (product) => product.id !== productId
    );

    setCount({ cart: newCartItemsList.length });
    setCart(newCartItemsList);
  }

  return (
    <Stack
      tokens={{ padding: '10px 30px', childrenGap: 10 }}
      style={{ height: '100%' }}
    >
      <Helmet>
        <title>Cesta de Produtos - S-Shop</title>
        <meta name="description" content="Cesta de Produtos do S-Shop" />
      </Helmet>

      <CustomBreadcrumb pathname={history.location.pathname} />

      {cartItems.length > 0 ? (
        <Stack>
          <TextField
            label="Nome "
            placeholder="Nome"
            required
            value={name ?? ''}
            errorMessage={!name && isTryingSubmit && nameErrorMessage}
            onChange={(_, newValue) => setName(newValue)}
          />

          <ProductInCartTable
            productsInCart={cartItems}
            editProductQuantity={handleEditCart}
            removeProductInCart={handleDeleteProductInCart}
          />

          <Stack tokens={{ childrenGap: 20 }} horizontalAlign="end">
            <h3>
              Total {formatCurrencyNumberToBRL(amount, { showSymbol: true })}
            </h3>

            <PrimaryButton
              text="Finalizar Compra"
              onClick={handleSubmitOrder}
            />
          </Stack>
        </Stack>
      ) : (
        <Stack verticalAlign="center" style={{ height: '100%' }}>
          <NoItemsFound
            text="Não há nenhum produto na cesta"
            iconName="ProductVariant"
            iconAreaLabel="Icone de um produto"
          />
        </Stack>
      )}
    </Stack>
  );
}
