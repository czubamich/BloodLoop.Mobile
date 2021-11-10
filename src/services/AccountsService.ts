import { config } from "../config"
import { NewAccountData } from "../models/AccountData";
import { AccountsClient, GenderType, RegisterDonorCommand } from "../utils/api/ApiClient"

export default class AuthService {
    client: AccountsClient;

    constructor()
    {
        this.client = new AccountsClient(config.apiUrl)
    }

    public signUp(newAccount: NewAccountData) {
        return this.client.registerDonor(
            new RegisterDonorCommand({
                email: newAccount.email,
                userName: newAccount.email,
                firstName: newAccount.firstName,
                lastName: newAccount.lastName,
                password: newAccount.password,
                birthDay: newAccount.birthDay,
                gender: newAccount.gender ? GenderType.Male : GenderType.Female,
            })
        )
    }
}