import React from 'react';
import { Text, Icon, Center, SectionList, Divider, Fab } from "native-base";
import { DonationCard } from '../../components/donations/DonationCard';
import DonorService from '../../services/DonorService';
import { LoadingView } from '../InitStack/LoadingView';
import { DonationSection } from '../../models/DonationData';
import { useAuth } from '../../components/AuthProvider';
import { AntDesign } from "@expo/vector-icons"
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

export const DonationsScreen = () => {
  const [data, setData] = React.useState<DonationSection[]>(undefined)
  const authContext = useAuth();

  useFocusEffect(() => {
    async function fetchDonations() {
      if (data != undefined) return;
      await authContext.refresh()

      let donorService = new DonorService(authContext.authData)
      let response = await donorService.getDonations()
      setData(response)
    }

    fetchDonations()
  })

  if(data == undefined)
    return <LoadingView/>

  return (
      <>
        <SectionList
          sections={data}
          renderItem={({ item }) => (<DonationCard {...item}/>)}
          renderSectionHeader={({ section: { title } }) => <Center my={2}><Text fontSize="xl">{title}</Text></Center>}
          renderSectionFooter={() => <Divider/>}
        />
      </>
  );
}
