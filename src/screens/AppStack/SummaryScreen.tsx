import React from 'react';
import { VStack, Text, Icon, Center, Select, Divider, Flex, Spinner, HStack } from "native-base";
import DonorService from '../../services/DonorService';
import { LoadingView } from '../InitStack/LoadingView';
import { DonationSummary, DonorInfo } from '../../models/DonationData';
import { useAuth } from '../../components/AuthProvider';
import { SummaryCard } from '../../components/summary/SummaryCard';
import { DictionariesClient, IDonationTypeDto, IDonorDto } from '../../utils/api/ApiClient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { config } from '../../config';

export const SummaryScreen = () => {
  const [summary, setSummary] = React.useState<DonationSummary>(undefined)
  const [total, setTotal] = React.useState<DonationSummary>(undefined)
  const [donorInfo, setDonorInfo] = React.useState<DonorInfo>(undefined)
  const [donationTypes, setDonationTypes] = React.useState<IDonationTypeDto[]>(undefined)
  const [isFetchingSummary, setIsFetchingSummary] = React.useState(true)
  const authContext = useAuth()

  async function fetchDonorInfo() {
    let donorService = new DonorService(authContext.authData)
    let response = await donorService.getCurrentDonorInfo()
    setDonorInfo(response)
  }

  async function fetchTotal() {
    let donorService = new DonorService(authContext.authData)
    let response = await donorService.getTotalSummary()
    setTotal(response)
  }

  async function fetchSummary(donationType) {
    setIsFetchingSummary(true)
    let donorService = new DonorService(authContext.authData)
    let response = await donorService.getDonationsSummary(donationType)
    setSummary(response)
    setIsFetchingSummary(false)
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
      await authContext.refresh()
      await fetchDonationTypes();
      await fetchDonorInfo();
      await fetchSummary("whole");
      await fetchTotal();
    }
    
    _setup()
  }, []) 

  if(donationTypes == undefined 
    || donorInfo == undefined 
    || summary == undefined 
    || total == undefined)
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
          <SummaryCard mt={4} data={summary}>
            <HStack>
              <Text color="red.600" fontSize='2xl' mr={4} mb={2}>{donationTypes.find(x => x.label == summary.name).name} Summary</Text>
              {(isFetchingSummary) ? <Spinner/> : <></>}
            </HStack>
          </SummaryCard>
          <Divider my={4}/>
          <SummaryCard data={total}>
            <VStack>
              <Text color="red.600" fontSize='2xl' mr={4}>Total Summary</Text>
              <Text color="muted.300" fontSize='md' mb={2}>Recalculated as Whole Blood</Text>
            </VStack>
          </SummaryCard>
      </VStack>
  );
}