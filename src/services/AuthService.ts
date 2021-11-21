import { AuthClient, AuthenticateRequest, AuthenticationResult, RefreshTokenRequest } from "../utils/api/ApiClient";
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
        ).catch((reason) => {
            return new AuthenticationResult(
            {
                success: false,
                message: "An error has occured.",
            })
        })
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