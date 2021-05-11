import React, { useEffect, useState } from 'react';
import { Panel, Stack } from '@fluentui/react';
import PropTypes from 'prop-types';

import { Navbar } from 'components/Navbar';
import { MenuTitle } from './styles';

function formatNavLinks(links) {
  return links.map((link) => ({
    name: link.name,
    icon: link.iconName,
    key: link.path,
  }));
}

export function Menu({ isMenuOpen, closeMenu, userLinks, adminLinks }) {
  const [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
    const allLinks = [];

    if (userLinks) {
      const formattedUserLinks = formatNavLinks(userLinks);
      allLinks.push({ name: 'Seção do usuário', links: formattedUserLinks });
    }

    if (adminLinks) {
      const formattedAdminLinks = formatNavLinks(adminLinks);
      allLinks.push({
        name: 'Seção Administrativa',
        links: formattedAdminLinks,
      });
    }

    setNavLinks(allLinks);
  }, [userLinks, adminLinks]);

  return (
    <Panel
      isOpen={isMenuOpen}
      onDismiss={closeMenu}
      headerText="S-Shop Menu"
      closeButtonAriaLabel="Fechar menu"
      isLightDismiss
      styles={{ content: { padding: 0 } }}
    >
      <Stack tokens={{ childrenGap: 10, padding: '10px 0' }}>
        <MenuTitle>Todas as seções</MenuTitle>

        <Navbar navLinks={navLinks} onLinkClick={closeMenu} />
      </Stack>
    </Panel>
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

Menu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
  userLinks: linksSchema.isRequired,
  adminLinks: linksSchema.isRequired,
};
