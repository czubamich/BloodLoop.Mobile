import {combineReducrs} from "redux"
import authReducer from "./auth"
import donorReducer from "./donor"
import donationsReducer from "./donations"

const rootReducer = combineReducrs({
    auth: authReducer,
    donor: donorReducer,
    donations: donationsReducer,
});

export default rootReducer;