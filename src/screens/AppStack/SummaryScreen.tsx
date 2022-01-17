import React from 'react';
import { VStack, Text, Icon, Center, Select, Divider, Flex } from "native-base";
import DonorService from '../../services/DonorService';
import { LoadingView } from '../InitStack/LoadingView';
import { DonationSummary, DonorInfo } from '../../models/DonationData';
import { useAuth } from '../../components/AuthProvider';
import { SummaryCard } from '../../components/summary/SummaryCard';
import { DictionariesClient, IDonationTypeDto, IDonorDto } from '../../utils/api/ApiClient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DonationIntervalCard } from '../../components/summary/DonationIntervalCard';
import { config } from '../../config';

export const SummaryScreen = () => {
  const [data, setData] = React.useState<DonationSummary>(undefined)
  const [donorInfo, setDonorInfo] = React.useState<DonorInfo>(undefined)
  const [donationTypes, setDonationTypes] = React.useState<IDonationTypeDto[]>(undefined)
  const [isFetchingData, setIsFetchingData] = React.useState(true)
  const authContext = useAuth()

  async function fetchDonorInfo() {
    let donorService = new DonorService(authContext.authData)
    let response = await donorService.getCurrentDonorInfo()
    setDonorInfo(response)
  }

  async function fetchSummary(donationType) {
    setIsFetchingData(true)
    await authContext.refresh()

    let donorService = new DonorService(authContext.authData)
    let response = await donorService.getDonationsSummary(donationType)
    setData(response)
    setIsFetchingData(false)
  }

  async function fetchDonationTypes() {
    var apiClient = new DictionariesClient(config.apiUrl)
    var donationTypes = await apiClient.getDonationTypes()
    donationTypes = donationTypes.filter(x => x.label!="disqualified")
    setDonationTypes(donationTypes)
  }

  React.useEffect(() => {
    async function _setup()
    {
      await fetchDonationTypes();
      await fetchDonorInfo();
      await fetchSummary("whole");
    }
    
    _setup()
  }, []) 

  if(donationTypes == undefined || donorInfo == undefined || data == undefined)
    return <LoadingView/>

  return (
      <VStack pt={4}>
          <Center>
            <Icon as={MaterialCommunityIcons} name="water" color="red.600" size={20}/>
            <Text color="red.600" fontSize='2xl'>{donorInfo ? donorInfo?.bloodType : "?"}</Text>
          </Center>
          <Divider mb={4} mt={2}/>
          <Center>
            <Select width="80%" variant='filled' placeholder="Donation Type" defaultValue={"whole"} onValueChange={(value) => fetchSummary(value)}>
              {donationTypes ? donationTypes.map((donationType) => <Select.Item label={donationType.name} value={donationType.label}/>) : <Select.Item isDisabled label="loading..." value=""/>}
            </Select>
          </Center>
          <SummaryCard mt={4} data={data}><Text color="red.600" fontSize='2xl'>Total Donated</Text></SummaryCard>
      </VStack>
  );
}