import { useState } from 'react';
import {
  ConstrainMode,
  DetailsList,
  IconButton,
  PrimaryButton,
  SelectionMode,
  Stack,
  TextField,
} from '@fluentui/react';
import PropTypes from 'prop-types';

import { TablePagination } from 'components/TablePagination';

export function ProductTable({ addProductToCart, products }) {
  const [productQuantity, setProductQuantity] = useState({});
  const [currentProductList, setCurrentProductList] = useState([]);

  function handleAddProductToCart(product) {
    const allQuantities = JSON.parse(JSON.stringify(productQuantity));

    addProductToCart({
      ...product,
      quantity: productQuantity[product.id] ?? 1,
    });

    delete allQuantities[product.id];
    setProductQuantity(allQuantities);
  }

  const columns = [
    {
      key: 'product',
      fieldName: 'name',
      name: 'Produto',
      ariaLabel: 'Coluna de produtos',
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
      key: 'actions',
      fieldName: 'actions',
      name: 'actions',
      minWidth: 250,
      isMultiline: true,
      isIconOnly: true,
      onRender: (item) => (
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <Stack horizontal tokens={{ childrenGap: 5 }}>
            <IconButton
              iconProps={{ iconName: 'Remove' }}
              title="Diminuir quantidade"
              ariaLabel="Diminuir quantidade"
              onClick={() =>
                setProductQuantity((prevItems) => ({
                  ...prevItems,
                  [item.id]: prevItems[item.id] - 1,
                }))
              }
              disabled={
                !productQuantity[item.id] || productQuantity[item.id] < 2
              }
            />
            <TextField
              style={{ width: 50 }}
              min={1}
              value={productQuantity[item.id] ?? 1}
              onChange={(_, newValue) =>
                setProductQuantity((prevItems) => ({
                  ...prevItems,
                  [item.id]: newValue.replace(/\D/g, ''),
                }))
              }
            />
            <IconButton
              iconProps={{ iconName: 'Add' }}
              title="Aumentar quantidade"
              ariaLabel="Aumentar quantidade"
              onClick={() =>
                setProductQuantity((prevItems) => ({
                  ...prevItems,
                  [item.id]: prevItems[item.id] ? prevItems[item.id] + 1 : 2,
                }))
              }
            />
          </Stack>

          <PrimaryButton
            text="Adicionar"
            title="Adicionar produto"
            onClick={() => handleAddProductToCart(item)}
          />
        </Stack>
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
          items={currentProductList}
          columns={columns}
          selectionMode={SelectionMode.none}
          constrainMode={ConstrainMode.horizontalConstrained}
          styles={{
            headerWrapper: { '& .ms-DetailsHeader': { paddingTop: 0 } },
          }}
        />
      </Stack.Item>

      <Stack.Item align="center">
        <TablePagination
          list={products}
          setSelectedList={setCurrentProductList}
          itemsPerPage={10}
        />
      </Stack.Item>
    </Stack>
  );
}

ProductTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  addProductToCart: PropTypes.func.isRequired,
};
