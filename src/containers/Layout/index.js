import { useEffect, useState } from 'react';
import { Stack } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import PropTypes from 'prop-types';

import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { Menu } from 'components/Menu';
import { MainContext } from 'contexts';
import { useLocalStorage } from 'hooks';

export default function Layout({
  children,
  currentLinks,
  userLinks,
  adminLinks,
}) {
  const [itemsInCart] = useLocalStorage('cart', []);
  const [count, setCount] = useState({ cart: 0 });
  const [isMenuOpen, { setTrue: openMenu, setFalse: closeMenu }] = useBoolean(
    false
  );

  useEffect(() => {
    setCount((prevState) => ({ ...prevState, cart: itemsInCart.length }));
  }, [itemsInCart]);

  return (
    <Stack
      vertical
      tokens={{ maxWidth: 1920 }}
      style={{ width: '100%', margin: '0 auto' }}
    >
      <Header openMenu={openMenu} />
      <Menu
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        userLinks={userLinks}
        adminLinks={adminLinks}
      />

      <MainContext.Provider value={{ count, setCount }}>
        <Stack horizontal style={{ height: '100%', width: '100%' }}>
          <Stack.Item>
            <Sidebar links={currentLinks} />
          </Stack.Item>
          <Stack.Item styles={{ root: { minWidth: 200 } }} grow>
            {children}
          </Stack.Item>
        </Stack>
      </MainContext.Provider>
    </Stack>
  );
}

const linksSchema = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  currentLinks: linksSchema.isRequired,
  userLinks: linksSchema.isRequired,
  adminLinks: linksSchema.isRequired,
};
