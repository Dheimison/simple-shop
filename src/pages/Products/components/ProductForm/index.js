import { PrimaryButton, Stack, TextField } from '@fluentui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { maskValueBRL } from 'helpers';
import * as S from './styles';

export function ProductForm({ createProduct, inputErrorMessage }) {
  const [isTryingSubmit, setIsTryingSubmit] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);

  function clearFields() {
    setName(null);
    setDescription(null);
    setPrice(null);
  }

  function handleSubmitProduct() {
    setIsTryingSubmit(true);

    if (name && description && price) {
      setIsTryingSubmit(false);
      createProduct({ name, description, price }, clearFields);
    }
  }

  return (
    <S.FormContainer>
      <Stack
        tokens={{ childrenGap: 30 }}
        style={{ flexGrow: 1 }}
        horizontal
        wrap
      >
        <Stack.Item grow={1}>
          <TextField
            name="name"
            label="Produto"
            placeholder="Produto"
            errorMessage={!name && isTryingSubmit && inputErrorMessage.name}
            onChange={(_, newValue) => setName(newValue)}
            value={name || ''}
          />
        </Stack.Item>

        <Stack.Item grow={3}>
          <TextField
            name="description"
            label="Descrição"
            placeholder="Descrição"
            errorMessage={
              !description && isTryingSubmit && inputErrorMessage.description
            }
            onChange={(_, newValue) => setDescription(newValue)}
            value={description || ''}
          />
        </Stack.Item>

        <Stack.Item grow={1}>
          <TextField
            name="price"
            label="Preço"
            placeholder="Preço"
            prefix="R$"
            errorMessage={!price && isTryingSubmit && inputErrorMessage.price}
            onChange={(_, newValue) => setPrice(maskValueBRL(newValue))}
            value={price || ''}
          />
        </Stack.Item>
      </Stack>

      <Stack.Item>
        <PrimaryButton
          type="submit"
          iconProps={{ iconName: 'Add' }}
          onClick={handleSubmitProduct}
          style={{ marginTop: 29 }}
        />
      </Stack.Item>
    </S.FormContainer>
  );
}

ProductForm.propTypes = {
  createProduct: PropTypes.func.isRequired,
  inputErrorMessage: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};
