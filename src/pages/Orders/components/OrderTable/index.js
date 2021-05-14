import { useState } from 'react';
import {
  ConstrainMode,
  DetailsList,
  SelectionMode,
  Stack,
} from '@fluentui/react';
import PropTypes from 'prop-types';

import { TablePagination } from 'components/TablePagination';
import { formatCurrencyNumberToBRL } from 'helpers';

export function OrderTable({ orders }) {
  const [currentOrderList, setCurrentOrderList] = useState([]);

  const columns = [
    {
      key: 'username',
      fieldName: 'username',
      name: 'Nome',
      minWidth: 200,
      maxWidth: 500,
      isMultiline: true,
      isRowHeader: true,
    },
    {
      key: 'quantityTotal',
      fieldName: 'quantityTotal',
      name: 'Quantidade',
      minWidth: 200,
      isMultiline: true,
    },
    {
      key: 'price',
      fieldName: 'price',
      name: 'Preço',
      minWidth: 200,
      maxWidth: 350,
      isMultiline: true,
      onRender: (item) =>
        formatCurrencyNumberToBRL(item.amount, { showSymbol: true }),
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
          items={currentOrderList}
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
          list={orders}
          setSelectedList={setCurrentOrderList}
          itemsPerPage={10}
        />
      </Stack.Item>
    </Stack>
  );
}

OrderTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      quantityTotal: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          id: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};
