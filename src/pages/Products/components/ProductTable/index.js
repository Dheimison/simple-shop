import { useState } from 'react';
import {
  ConstrainMode,
  DefaultButton,
  DetailsList,
  IconButton,
  PrimaryButton,
  SelectionMode,
  Stack,
  TextField,
} from '@fluentui/react';
import PropTypes from 'prop-types';

import { TablePagination } from 'components/TablePagination';
import { maskValueBRL, formatCurrencyNumberToBRL } from 'helpers';

export function ProductTable({
  editProduct,
  deleteProduct,
  products,
  inputErrorMessage,
}) {
  const [itemEditting, setItemEditting] = useState({});
  const [currentProductList, setCurrentProductList] = useState([]);

  function handleSaveEdit(productId) {
    if (
      itemEditting[productId].name &&
      itemEditting[productId].description &&
      itemEditting[productId].price
    ) {
      const items = JSON.parse(JSON.stringify(itemEditting));
      const productInfo = {
        id: productId,
        name: itemEditting[productId].name,
        description: itemEditting[productId].description,
        price: itemEditting[productId].price,
      };

      editProduct(productInfo);

      delete items[productId];
      setItemEditting(items);
    }
  }

  function handleEditName(productId, newValue) {
    setItemEditting((prevItems) => ({
      ...prevItems,
      [productId]: {
        ...prevItems[productId],
        name: newValue,
      },
    }));
  }

  function handleEditDescription(productId, newValue) {
    setItemEditting((prevItems) => ({
      ...prevItems,
      [productId]: {
        ...prevItems[productId],
        description: newValue,
      },
    }));
  }

  function handleEditPrice(productId, newValue) {
    setItemEditting((prevItems) => ({
      ...prevItems,
      [productId]: {
        ...prevItems[productId],
        price: maskValueBRL(newValue),
      },
    }));
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
      onRender: (item) => {
        if (itemEditting[item.id]) {
          return (
            <TextField
              name="name"
              placeholder="Produto"
              errorMessage={
                !itemEditting[item.id].name && inputErrorMessage.name
              }
              onChange={(_, newValue) => handleEditName(item.id, newValue)}
              value={itemEditting[item.id].name || ''}
            />
          );
        }

        return item.name;
      },
    },
    {
      key: 'description',
      fieldName: 'description',
      name: 'Descrição',
      minWidth: 200,
      isMultiline: true,
      onRender: (item) => {
        if (itemEditting[item.id]) {
          return (
            <TextField
              name="description"
              placeholder="Descrição"
              errorMessage={
                !itemEditting[item.id].description &&
                inputErrorMessage.description
              }
              onChange={(_, newValue) =>
                handleEditDescription(item.id, newValue)
              }
              value={itemEditting[item.id].description || ''}
            />
          );
        }

        return item.description;
      },
    },
    {
      key: 'price',
      fieldName: 'price',
      name: 'Preço',
      minWidth: 200,
      maxWidth: 350,
      isMultiline: true,
      onRender: (item) => {
        if (itemEditting[item.id]) {
          return (
            <TextField
              name="price"
              placeholder="Preço"
              prefix="R$"
              errorMessage={
                !itemEditting[item.id].price && inputErrorMessage.price
              }
              onChange={(_, newValue) => handleEditPrice(item.id, newValue)}
              value={
                itemEditting[item.id].price
                  ? maskValueBRL(itemEditting[item.id].price)
                  : ''
              }
            />
          );
        }

        return formatCurrencyNumberToBRL(item.price, {
          showSymbol: true,
        });
      },
    },
    {
      key: 'actions',
      fieldName: 'actions',
      name: 'actions',
      minWidth: 150,
      isMultiline: true,
      isIconOnly: true,
      onRender: (item) => (
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          {itemEditting[item.id] ? (
            <PrimaryButton
              text="Salvar"
              title="Salvar produto"
              onClick={() => handleSaveEdit(item.id)}
            />
          ) : (
            <DefaultButton
              text="Editar"
              title="Editar produto"
              onClick={() =>
                setItemEditting((prevItems) => ({
                  ...prevItems,
                  [item.id]: {
                    name: item.name,
                    description: item.description,
                    price: formatCurrencyNumberToBRL(item.price),
                  },
                }))
              }
            />
          )}

          <IconButton
            iconProps={{ iconName: 'Delete' }}
            styles={{ icon: { color: 'red', fontSize: 18 } }}
            title="Deletar produto"
            ariaLabel="Deletar produto"
            onClick={() => deleteProduct(item.id)}
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
          skipViewportMeasures={false}
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
  inputErrorMessage: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  editProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};
