import {
  ConstrainMode,
  DetailsList,
  IconButton,
  SelectionMode,
  Stack,
  TextField,
} from '@fluentui/react';
import PropTypes from 'prop-types';

import { formatCurrencyNumberToBRL } from 'helpers';

export function ProductInCartTable({
  editProductQuantity,
  removeProductInCart,
  productsInCart,
}) {
  const columns = [
    {
      key: 'quantity',
      fieldName: 'quantity',
      name: 'Quantidade',
      minWidth: 150,
      maxWidth: 150,
      isMultiline: true,
      onRender: (item) => (
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <Stack horizontal tokens={{ childrenGap: 5 }}>
            <IconButton
              iconProps={{ iconName: 'Remove' }}
              title="Diminuir quantidade"
              ariaLabel="Diminuir quantidade"
              onClick={() =>
                editProductQuantity({
                  id: item.id,
                  quantity: Number(item.quantity) - 1,
                })
              }
              disabled={item.quantity < 2}
            />
            <TextField
              style={{ width: 50 }}
              min={1}
              value={item.quantity}
              onChange={(_, newValue) => {
                if (newValue.replace(/\D/g, '')) {
                  editProductQuantity({
                    id: item.id,
                    quantity: Number(newValue.replace(/\D/g, '')),
                  });
                }
              }}
            />
            <IconButton
              iconProps={{ iconName: 'Add' }}
              title="Aumentar quantidade"
              ariaLabel="Aumentar quantidade"
              onClick={() =>
                editProductQuantity({
                  id: item.id,
                  quantity: Number(item.quantity + 1),
                })
              }
            />
          </Stack>
        </Stack>
      ),
    },
    {
      key: 'product',
      fieldName: 'name',
      name: 'Produto',
      minWidth: 200,
      maxWidth: 350,
      isMultiline: true,
      isRowHeader: true,
    },
    {
      key: 'description',
      fieldName: 'description',
      name: 'Descrição',
      minWidth: 200,
      isMultiline: true,
    },
    {
      key: 'price',
      fieldName: 'price',
      name: 'Valor',
      minWidth: 200,
      maxWidth: 350,
      isMultiline: true,
      onRender: (item) =>
        formatCurrencyNumberToBRL(item.quantity * item.price, {
          showSymbol: true,
        }),
    },
    {
      key: 'actions',
      fieldName: 'actions',
      name: 'actions',
      minWidth: 100,
      isMultiline: true,
      isIconOnly: true,
      onRender: (item) => (
        <IconButton
          iconProps={{ iconName: 'Delete' }}
          styles={{ icon: { color: 'red', fontSize: 18 } }}
          title="Deletar produto da cesta"
          ariaLabel="Deletar produto da cesta"
          onClick={() => removeProductInCart(item.id)}
        />
      ),
    },
  ];

  return (
    <Stack
      verticalAlign="space-between"
      tokens={{ childrenGap: 20, padding: '20px 0' }}
      style={{ height: '100%' }}
    >
      <Stack.Item style={{ border: '1px solid', width: '100%' }}>
        <DetailsList
          items={productsInCart}
          columns={columns}
          selectionMode={SelectionMode.none}
          constrainMode={ConstrainMode.horizontalConstrained}
          styles={{
            headerWrapper: { '& .ms-DetailsHeader': { paddingTop: 0 } },
          }}
        />
      </Stack.Item>
    </Stack>
  );
}

ProductInCartTable.propTypes = {
  productsInCart: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  removeProductInCart: PropTypes.func.isRequired,
  editProductQuantity: PropTypes.func.isRequired,
};
