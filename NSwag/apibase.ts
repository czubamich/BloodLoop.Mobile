export class ApiBase {
  authToken = '';
  protected constructor() {
  }
  
  setAuthToken(token: string) {
      this.authToken = token;
  }

  protected transformOptions(options: RequestInit): Promise<any> {
      if(this.authToken)
          options.headers = {
              ...options.headers,
              "Authorization": "Bearer "+this.authToken
          }
    return Promise.resolve(options);
  }
}