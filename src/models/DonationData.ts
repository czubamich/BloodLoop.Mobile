export interface DonationData
{
    name: string;
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
}