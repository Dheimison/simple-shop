import { useEffect, useState } from 'react';
import { Breadcrumb, Stack } from '@fluentui/react';
import PropTypes from 'prop-types';

export function CustomBreadcrumb({ pathname }) {
  const [items, setItems] = useState([
    {
      text: 'Carregando...',
      key: 'Carregando',
    },
  ]);

  useEffect(() => {
    if (pathname) {
      const pathnames = pathname.split('/').filter(Boolean);
      const formattedItems = pathnames.map((path) => ({
        text: path,
        key: path,
      }));
      formattedItems[0].isCurrentItem = true;

      setItems(formattedItems);
    }

    // eslint-disable-next-line
  }, []);

  function customStyles({ theme }) {
    const customLastChild = {
      ':last-child .ms-Breadcrumb-item': {
        // color: theme.palette.neutralSecondary,
        fontWeight: theme.fonts.large.fontWeight,
      },
    };

    const customFirstChild = {
      ':first-child .ms-Breadcrumb-item': {
        color: theme.palette.neutralPrimary,
        fontWeight: theme.fonts.xLarge.fontWeight,
      },
    };

    if (!(items.length > 1)) {
      return { listItem: { ...customLastChild } };
    }

    return {
      listItem: { ...customFirstChild, ...customLastChild },
    };
  }

  return (
    <Stack style={{ height: 50 }}>
      <Breadcrumb items={items} styles={customStyles} />
    </Stack>
  );
}

CustomBreadcrumb.propTypes = {
  pathname: PropTypes.string.isRequired,
};
