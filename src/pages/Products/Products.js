import { Helmet } from 'react-helmet';
import { Stack } from '@fluentui/react';
import { useHistory } from 'react-router-dom';

import { CustomBreadcrumb } from 'components/CustomBreadcrumb';
import { NoItemsFound } from 'components/NoItemsFound';
import { useLocalStorage } from 'hooks';
import { formatCurrencyStringToNumber } from 'helpers';
import { ProductForm } from './components/ProductForm';
import { ProductTable } from './components/ProductTable';

const inputErrorMessage = {
  name: 'É necessário informar um nome para o produto.',
  description: 'É necessário informar uma descrição para o produto.',
  price: 'É necessário informar um preço para o produto.',
};

export function Products() {
  const history = useHistory();
  const [products, setProducts] = useLocalStorage('product', []);

  function handleCreateNewProduct({ name, description, price }, clearFields) {
    const allProducts = [...products];
    const currentId =
      allProducts.length > 0 ? allProducts[0].id + 1 : allProducts.length + 1;

    allProducts.unshift({
      id: currentId,
      name,
      description,
      price: formatCurrencyStringToNumber(price),
    });

    setProducts(allProducts);
    clearFields();
  }

  function handleEditProduct({ id, name, description, price }) {
    const productList = [...products];
    const productIndex = productList.findIndex((product) => product.id === id);

    productList[productIndex] = {
      id,
      name,
      description,
      price: formatCurrencyStringToNumber(price),
    };

    setProducts(productList);
  }

  function handleDeleteProduct(productId) {
    const productList = [...products];
    const newProductList = productList.filter(
      (product) => product.id !== productId
    );

    setProducts(newProductList);
  }

  return (
    <Stack
      tokens={{ padding: '10px 30px', childrenGap: 30 }}
      style={{ height: '100%' }}
    >
      <Helmet>
        <title>Produtos - S-Shop</title>
        <meta name="description" content="Todos os produtos do S-Shop" />
      </Helmet>

      <CustomBreadcrumb pathname={history.location.pathname} />

      <Stack.Item>
        <ProductForm
          createProduct={handleCreateNewProduct}
          inputErrorMessage={inputErrorMessage}
        />
      </Stack.Item>

      {products && products.length > 0 ? (
        <ProductTable
          products={products}
          inputErrorMessage={inputErrorMessage}
          editProduct={handleEditProduct}
          deleteProduct={handleDeleteProduct}
        />
      ) : (
        <NoItemsFound
          text="Nenhum produto cadastrado"
          iconName="ProductList"
          iconAreaLabel="Icone de um produto"
        />
      )}
    </Stack>
  );
}
