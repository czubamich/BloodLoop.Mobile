import { DonationData } from "../../models/DonationData";

const donationReducer = (state: DonationData[] = [], action) => {
    switch(action) {
        case "RefreshDonations":

            break;
        case "AddDonation":

            break;
        case "RemoveDonation":
            
            break;
        case "UpdateDonationDetails":
            
            break;
        default:
            return state;
    }
}