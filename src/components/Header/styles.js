import styled, { css } from 'styled-components';
import { Stack as DefaultStack } from '@fluentui/react';

export const Stack = styled(DefaultStack)`
  ${({ theme }) => css`
    padding: 10px 30px;
    border-bottom: 1px solid ${theme.palette.neutralLight};
  `}
`;

export const LogoText = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.xLarge.fontSize};
    font-weight: ${theme.fonts.xLarge.fontWeight};
    margin-left: ${theme.spacing.m};
  `}
`;
