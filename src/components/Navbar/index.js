import { Nav } from '@fluentui/react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export function Navbar({ navLinks, onLinkClick }) {
  const history = useHistory();
  const location = useLocation();

  function handleLinkClick(key) {
    history.push(key);
    onLinkClick();
  }

  return (
    <Nav
      selectedKey={location.pathname}
      ariaLabel="Barra Navegação"
      groups={navLinks}
      onLinkClick={(_, item) => item && item.key && handleLinkClick(item.key)}
      styles={{ groupContent: { marginBottom: 0 } }}
    />
  );
}

Navbar.defaultProps = {
  onLinkClick: () => null,
};

Navbar.propTypes = {
  onLinkClick: PropTypes.func,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          icon: PropTypes.string.isRequired,
          key: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired
  ).isRequired,
};
