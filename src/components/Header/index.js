import { ActionButton, IconButton } from '@fluentui/react';
import PropTypes from 'prop-types';

import * as S from './styles';

export function Header({ onLogoClick, onMenuClick }) {
  const logoProps = { iconName: 'ShoppingCart', style: { fontSize: 26 } };
  const menuProps = { iconName: 'GlobalNavButton', style: { fontSize: 26 } };

  return (
    <S.Stack
      horizontal
      horizontalAlign="space-between"
      verticalAlign="center"
      tokens={{ childrenGap: 15 }}
    >
      <ActionButton iconProps={logoProps} onClick={() => onLogoClick('/')}>
        <S.LogoText>S-Shop</S.LogoText>
      </ActionButton>

      <IconButton iconProps={menuProps} onClick={onMenuClick} />
    </S.Stack>
  );
}

Header.propTypes = {
  onLogoClick: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};
