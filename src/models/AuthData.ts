export default interface AuthData {
  token: string;
  tokenExpiresAt: Date;
  refreshToken: string;
  refreshExpiresAt: Date;
  email: string;
};