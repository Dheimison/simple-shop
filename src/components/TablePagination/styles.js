import styled, { css } from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  column-gap: 5px;
  row-gap: 5px;
`;

export const PaginationButton = styled.button`
  ${({ theme, disabled, bordered }) => css`
    background: none;
    border: none;
    font-size: 20px;
    font-weight: bold;
    color: ${disabled
      ? theme.palette.neutralTertiary
      : theme.palette.themePrimary};
    padding: 5px 10px;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: ${bordered ? '1px solid' : 'none'};
    border-radius: 5px;
  `}
`;
