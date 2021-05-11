import styled, { css } from 'styled-components';

export const MenuTitle = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.xLarge.fontSize};
    font-weight: ${theme.fonts.xLarge.fontWeight};
    color: ${theme.palette.neutralSecondary};
    padding: 0px 24px;
  `}
`;
