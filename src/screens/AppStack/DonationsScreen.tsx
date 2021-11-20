import React from 'react';
import { Text, Center, SectionList, Divider } from "native-base";
import { DonationCard } from '../../components/donations/DonationCard';
import DonorService from '../../services/DonorService';
import { LoadingView } from '../InitStack/LoadingView';
import { DonationSection } from '../../models/DonationData';
import { useAuth } from '../../components/AuthProvider';
import { RefreshControl } from 'react-native';

export const DonationsScreen = () => {
  const [data, setData] = React.useState<DonationSection[]>(undefined)
  const authContext = useAuth()

  const refreshDonations = () => React.useEffect(() => {
    async function fetchDonations() {
      await authContext.refresh()

      let donorService = new DonorService(authContext.authData)
      let response = await donorService.getDonations()
      setData(response)
    }

    fetchDonations()
  }, [])

  refreshDonations()

  if(data == undefined)
    return <LoadingView/>

  return (
    <SectionList
      sections={data}
      renderItem={({ item }) => (<DonationCard {...item}/>)}
      renderSectionHeader={({ section: { title } }) => <Center my={2}><Text fontSize="xl">{title}</Text></Center>}
      renderSectionFooter={() => <Divider/>}
    />
  );
}
