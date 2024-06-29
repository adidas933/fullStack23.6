class AppConfig {
  public readonly productUrl = 'http://localhost:4000/api/products/';
  public readonly employeeUrl = 'http://localhost:4000/api/employees/';
  public readonly registerUrl = 'http://localhost:4000/api/register/';
  public readonly loginUrl = 'http://localhost:4000/api/login/';
}

export const appConfig = new AppConfig();
