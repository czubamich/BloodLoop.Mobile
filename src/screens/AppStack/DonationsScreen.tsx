import React from 'react';
import { Text, Center, ScrollView, SectionList, Divider } from "native-base";
import { DonationCard } from '../../components/donations/DonationCard';
import DonorService from '../../services/DonorService';
import { LoadingView } from '../InitStack/LoadingView';
import { SectionListData } from 'react-native';
import { DonationSection, DonationData } from '../../models/DonationData';
import { useAuth } from '../../components/AuthProvider';

export const DonationsScreen = () => {
  const [data, setData] = React.useState<DonationSection[]>(undefined)
  const authContext = useAuth()

  React.useEffect(() => {
    async function fetchDonations() {
      let donorService = new DonorService(authContext.authData)
      let response = await donorService.getDonations()
      setData(response)
    }

    fetchDonations()
  }, [])

  if(data == undefined)
    return <LoadingView/>

  return (
    <SectionList
      sections={data}
      renderItem={({ item }) => (<DonationCard name={item.name} date={item.date} amount={item.amount} />)}
      renderSectionHeader={({ section: { title } }) => <Center my={2}><Text fontSize="xl">{title}</Text></Center>}
      renderSectionFooter={() => <Divider />}
      />
  );
}
