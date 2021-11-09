export interface DonationData
{
    name: String;
    date: Date;
    amount: String;
}

export interface DonationSection
{
  title: string
  data: DonationData[]
}