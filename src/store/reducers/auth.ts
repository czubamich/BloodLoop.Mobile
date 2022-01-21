import AuthData from '../../models/AuthData'

const authReducer = (state: AuthData = {email: "", token: "", refreshToken: "", refreshExpiresAt: new Date(0), tokenExpiresAt: new Date(0)}, action: any) => {
    switch(action.type) {
        case "SignIn":

            break;
        case "SignOut":
            
            break;
        case "Refresh":
            
            break;
        default:
            return state;
    }
}