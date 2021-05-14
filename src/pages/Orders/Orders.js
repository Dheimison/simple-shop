import { Helmet } from 'react-helmet';
import { Stack } from '@fluentui/react';
import { CustomBreadcrumb } from 'components/CustomBreadcrumb';
import { useHistory } from 'react-router-dom';

import { NoItemsFound } from 'components/NoItemsFound';
import { useLocalStorage } from 'hooks';
import { OrderTable } from './components/OrderTable';

export function Orders() {
  const [allOrders] = useLocalStorage('order', []);
  const history = useHistory();

  return (
    <Stack
      tokens={{ padding: '10px 30px', childrenGap: 10 }}
      style={{ height: '100%' }}
    >
      <Helmet>
        <title>Compras - S-Shop</title>
        <meta name="description" content="Compras do S-Shop" />
      </Helmet>

      <CustomBreadcrumb pathname={history.location.pathname} />

      {allOrders.length > 0 ? (
        <OrderTable orders={allOrders} />
      ) : (
        <Stack verticalAlign="center" style={{ height: '100%' }}>
          <NoItemsFound
            text="Não há nenhuma compra realizada."
            iconName="DeactivateOrders"
            iconAreaLabel="Icone de uma lista"
          />
        </Stack>
      )}
    </Stack>
  );
}
