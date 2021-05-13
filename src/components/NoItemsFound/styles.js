import { FontIcon } from '@fluentui/react';
import styled, { css } from 'styled-components';

export const Text = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.xLargePlus};
    color: ${theme.palette.neutralSecondary};
    text-align: center;
  `}
`;

export const CustomIcon = styled(FontIcon)`
  ${({ theme }) => css`
    font-size: 40px;
    color: ${theme.palette.themeSecondary};
  `}
`;
