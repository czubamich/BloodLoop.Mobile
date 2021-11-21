import { ApiException, DonorsClient, GenderType } from "../utils/api/ApiClient";
import { config } from "../config"
import AuthData from "../models/AuthData";
import { DonationData, DonationSection, DonationSummary, DonorInfo } from "../models/DonationData";
import React from "react";
import AuthService from "./AuthService";

export default class DonorService {
    client: DonorsClient;
    authFallback: Promise<boolean>

    constructor(authData: AuthData)
    {
        this.client = new DonorsClient(config.apiUrl)
        this.client.setAuthToken(authData.token)
    }

    public async getDonations() {
        return await this.client.getDonations()
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

    public getCurrentDonorInfo() {
        return this.client.getCurrentDonorInfo()
            .then((donorInfo) => <DonorInfo>{
                firstName: donorInfo.firstName,
                gender: donorInfo.gender == GenderType.Male ? true : false
            })
    }

    public getDonationsSummary(donationType: string) {
        return this.client.getDonationSummary(donationType)
            .then((donationSummary) => <DonationSummary>{
                name: donationSummary.donationType,
                count: donationSummary.count,
                amount: donationSummary.amount,
            })
    }
}