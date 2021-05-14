import { Home } from 'pages/Home';
import { Cart } from 'pages/Cart';
import { Products } from 'pages/Products';
import { Orders } from 'pages/Orders';

export const USER_ROUTES = [
  {
    key: 'HOME',
    name: 'Home',
    resource: 'home',
    iconName: 'Home',
    path: '/home',
    exact: true,
    component: Home,
  },
  {
    key: 'CART',
    name: 'Cesta',
    resource: 'cart',
    iconName: 'ShoppingCart',
    path: '/cesta',
    exact: true,
    component: Cart,
  },
];

export const ADMIN_ROUTES = [
  {
    key: 'ADMIN_PRODUCTS',
    name: 'Produtos',
    resource: 'products',
    iconName: 'ProductVariant',
    path: '/admin/produtos',
    exact: true,
    component: Products,
  },
  {
    key: 'ADMIN_ORDERS',
    name: 'Compras',
    resource: 'orders',
    iconName: 'ShopServer',
    path: '/admin/compras',
    exact: true,
    component: Orders,
  },
];

export const ADMIN_REDIRECTS = [
  {
    key: 'REDIRECT_ADMIN_PRODUCTS',
    from: '/admin',
    to: '/admin/produtos',
    exact: true,
  },
];

export const USER_REDIRECTS = [
  {
    key: 'REDIRECT_USER_HOME',
    from: '/',
    to: '/home',
    exact: true,
  },
];
