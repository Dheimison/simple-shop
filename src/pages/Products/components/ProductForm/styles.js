import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  width: 100%;
  column-gap: 30px;
  align-items: flex-start;

  @media (max-width: 500px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;
