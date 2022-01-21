import { TimeSpan } from "./TimeSpan";

export interface DonationData
{
    name: string;
    location: string;
    date: Date;
    amount: string;
}

export interface DonationSection
{
  title: string
  data: DonationData[]
}

export interface DonationSummary
{
    name: string;
    amount: number;
    count: number;
}

export interface DonorInfo
{
    firstName: string;
    gender: boolean;
    bloodType: string;
}

export interface DonationRestTime
{
    timeSpan: TimeSpan;
}