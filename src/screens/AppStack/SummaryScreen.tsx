import React from 'react';
import { Text, Center, SectionList, Divider, VStack, useBreakpointValue } from "native-base";
import { DonationCard } from '../../components/donations/DonationCard';
import DonorService from '../../services/DonorService';
import { LoadingView } from '../InitStack/LoadingView';
import { DonationSection, DonationSummary } from '../../models/DonationData';
import { useAuth } from '../../components/AuthProvider';
import { SummaryCard } from '../../components/summary/SummaryCard';

export const SummaryScreen = () => {
    const [data, setData] = React.useState<DonationSummary>(undefined)
    const authContext = useAuth()
  
    React.useEffect(() => {
      async function fetchDonations() {
        let donorService = new DonorService(authContext.authData)
        let response = await donorService.getDonationsSummary("whole")
        setData(response)
      }
      
      fetchDonations()
    }, [])
  
    if(data == undefined)
      return <LoadingView/>
  
    return (
        <VStack mt={"4"}>
            <SummaryCard {...data}/>
        </VStack>
    );
  }