import { useState } from 'react';
import { Stack } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import PropTypes from 'prop-types';

import { MainContext } from 'contexts';
import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { Menu } from 'components/Menu';

export function Layout({ children, currentLinks, userLinks, adminLinks }) {
  const [count, setCount] = useState({ cart: 0 });
  const [isMenuOpen, { setTrue: openMenu, setFalse: closeMenu }] = useBoolean(
    false
  );

  return (
    <Stack
      tokens={{ maxWidth: 1920 }}
      style={{ width: '100%', height: '100%', margin: '0 auto' }}
    >
      <Header openMenu={openMenu} />
      <Menu
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        userLinks={userLinks}
        adminLinks={adminLinks}
      />

      <MainContext.Provider value={{ count, setCount }}>
        <Stack horizontal style={{ height: '100%' }}>
          <Sidebar links={currentLinks} />
          {children}
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
