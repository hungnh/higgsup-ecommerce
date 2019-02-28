export class PathConfig {
  static PROTOCOL: string = 'http://';
  // static SERVER: string = '192.168.1.63';
  static SERVER: string = '192.168.1.11';
  // static STANDARD_SERVICE_PORT: string = ':8080/api/';
  static STANDARD_SERVICE_PORT: string = ':8080/xshop_v2/api/';
  static URL = PathConfig.PROTOCOL + PathConfig.SERVER + PathConfig.STANDARD_SERVICE_PORT;
  static LOG_IN: string = 'auth/login';
  static SUPPLIERS: string = 'suppliers';
  static CART: string = 'carts';
  static REGISTER = 'register';
  constructor() {
  }
}
