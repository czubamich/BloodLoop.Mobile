import { DonorsClient } from "../utils/api/ApiClient";
import { config } from "../config"
import AuthData from "../models/AuthData";
import { DonationData, DonationSection } from "../models/DonationData";

export default class DonorService {
    client: DonorsClient;

    constructor(authData: AuthData)
    {
        this.client = new DonorsClient(config.apiUrl)
        this.client.setAuthToken(authData.token)
    }

    public getDonations() {
        return (this.client.getDonations())
            .then((result) =>
            result.map((donationGroup) => ({
                title: donationGroup.key,
                data: donationGroup.donations.map((donation) => ({
                name: donation.donationTypeLabel,
                date: donation.date,
                amount: donation.volume.toString()
                } as DonationData))
          } as DonationSection)))
    }
}