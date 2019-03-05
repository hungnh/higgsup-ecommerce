export class PathConfig {
  static PROTOCOL: string = 'http://';
  static SERVER: string = '192.168.1.11';
  static STANDARD_SERVICE_PORT: string = ':8080/xshop_v2/api/';
  static URL = PathConfig.PROTOCOL + PathConfig.SERVER + PathConfig.STANDARD_SERVICE_PORT;
  static SUPPLIERS: string = 'suppliers';
  static PRODUCT: string = 'products';
  static CATEGORY: string = 'categories';
  static LOG_IN: string = 'auth/login';
  static CART: string = 'carts';
  static REGISTER = 'register';
  static PROFILE = 'profile';
  static PRODUCTS: string = 'products';
  static FEEDBACK: string = 'feedback';
  static RELATION: string = 'relation';
  static TOP_SALE: string = 'top-sale';
  static BREADCRUMB: string = 'breadcrumbs';

  constructor() {
  }
}
