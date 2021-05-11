import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { MainContext } from 'contexts';
import { Navbar } from 'components/Navbar';
import * as S from './styles';

function formatNavLinks(links, count) {
  return links.map((link) => ({
    name: `${link.name} ${
      count[link.resource] ? `(${count[link.resource]})` : ''
    }`,
    icon: link.iconName,
    key: link.path,
  }));
}

export function Sidebar({ links }) {
  const [navLinks, setNavLinks] = useState([]);
  const { count } = useContext(MainContext);

  useEffect(() => {
    if (links) {
      const formattedLinks = formatNavLinks(links, count);
      setNavLinks([{ links: formattedLinks }]);
    }
  }, [links, count]);

  return (
    <S.Container>
      <Navbar navLinks={navLinks} />
    </S.Container>
  );
}

Sidebar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      resource: PropTypes.string.isRequired,
      iconName: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};
