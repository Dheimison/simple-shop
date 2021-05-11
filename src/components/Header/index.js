import { ActionButton, IconButton } from '@fluentui/react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as S from './styles';

export function Header({ openMenu }) {
  const history = useHistory();
  const logoProps = { iconName: 'ShoppingCart', style: { fontSize: 26 } };
  const menuProps = { iconName: 'GlobalNavButton', style: { fontSize: 26 } };

  return (
    <S.Stack
      horizontal
      horizontalAlign="space-between"
      verticalAlign="center"
      tokens={{ childrenGap: 15 }}
    >
      <ActionButton iconProps={logoProps} onClick={() => history.push('/home')}>
        <S.LogoText>S-Shop</S.LogoText>
      </ActionButton>

      <IconButton iconProps={menuProps} onClick={openMenu} />
    </S.Stack>
  );
}

Header.propTypes = {
  openMenu: PropTypes.func.isRequired,
};
