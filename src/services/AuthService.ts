import { AccountsClient, AuthClient, AuthenticateRequest, RefreshTokenRequest } from "../utils/api/ApiClient";
import { config } from "../config"

export default class AuthService {
    client: AuthClient;

    constructor()
    {
        this.client = new AuthClient(config.apiUrl)
    }

    public signIn(userName: string, password: string) {
        return this.client.signIn(
            new AuthenticateRequest(
                {
                    usernameOrEmail: userName, 
                    password: password
                })
        )
    }

    public refresh(refreshToken: string) {
        return this.client.refreshToken(
            new RefreshTokenRequest(
                {
                    refreshToken: refreshToken
                })
        )
    }
}