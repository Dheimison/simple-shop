import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    border-right: 1px solid ${theme.palette.neutralLight};
    width: 200px;
    height: 100%;
  `}
`;
