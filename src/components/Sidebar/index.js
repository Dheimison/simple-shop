import { Nav } from '@fluentui/react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useContext, useEffect, useState } from 'react';
import { MainContext } from 'contexts';
import * as S from './styles';

export function Sidebar({ onNavClick, links }) {
  const [navLinks, setNavLinks] = useState(null);
  const { count } = useContext(MainContext);
  const location = useLocation();

  useEffect(() => {
    if (links) {
      const formattedLinks = links.map((link) => ({
        name: `${link.name} ${
          count[link.resource] ? `(${count[link.resource]})` : ''
        }`,
        icon: link.iconName,
        key: link.path,
      }));

      setNavLinks([{ links: formattedLinks }]);
    }
  }, [links, count]);

  return (
    <S.Container>
      <Nav
        selectedKey={location.pathname}
        ariaLabel="Sidebar navigation"
        groups={navLinks}
        onLinkClick={(_, item) => item && item.key && onNavClick(item.key)}
      />
    </S.Container>
  );
}

Sidebar.propTypes = {
  onNavClick: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      resource: PropTypes.string.isRequired,
      iconName: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};
