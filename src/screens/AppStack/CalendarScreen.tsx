import React from 'react';
import { View, Text, Center, ScrollView, SectionList, Divider, VStack, Select, HStack, Flex, Spacer } from "native-base";
import {Calendar} from 'react-native-calendars';
import { Card } from '../../components/common/Card';
import DonorService from '../../services/DonorService';
import { TimeSpan } from '../../models/TimeSpan';
import { DictionariesClient, DonationTypeDto } from '../../utils/api/ApiClient';
import { useAuth } from '../../components/AuthProvider';
import { LoadingView } from '../InitStack/LoadingView';
import { config } from '../../config';

export const CalendarScreen = () =>  {
    const [timeSpan, setTimeSpan] = React.useState<TimeSpan>(TimeSpan.zero)
    const [currentDate, setCurrentDate] = React.useState<Date>(undefined)
    const [donationTypes, setDonationTypes] = React.useState<DonationTypeDto[]>(undefined)
    const authContext = useAuth()
  
    async function fetchInterval(donationType) {
      await authContext.refresh()
  
      let donorService = new DonorService(authContext.authData)
      let response = await donorService.getDonationRestTime(donationType)
      console.log("loaded timespan: "+response.timeSpan.days);
      setTimeSpan(response.timeSpan)
      setCurrentDate(response.timeSpan.milliseconds>0 ? timeSpan.addTo(new Date(Date.now())) : new Date(Date.now()))
    }
  
    async function fetchDonationTypes() {
      var apiClient = new DictionariesClient(config.apiUrl)
      var donationTypes = await apiClient.getDonationTypes()
      donationTypes = donationTypes.filter(x => x.label!="disqualified")
      setDonationTypes(donationTypes)
      console.log("loadedDonationTypes");
    }
  
    React.useEffect(() => {
      async function _setup()
      {
        await fetchDonationTypes();
        await fetchInterval("whole");
      }
      
      _setup()
    }, []) 

    if(donationTypes == undefined || timeSpan == undefined || currentDate == undefined)
        return <LoadingView/>

    return (
        <VStack flex={1} py={4}>
            <Card>
                <Flex>
                    <Center width="auto">
                        <Calendar
                        current={currentDate.toDateString()}
                        minDate={timeSpan.addTo(new Date(Date.now())).toDateString()}
                        maxDate={TimeSpan.fromDays(90).addTo(new Date(Date.now())).toDateString()}
                        onDayPress={day => {
                            console.log('selected day', day);
                        }}
                        monthFormat={'yyyy MM'}
                        onMonthChange={month => {
                            console.log('month changed', month);
                        }}
                        hideArrows={false}
                        hideExtraDays={true}
                        firstDay={1}
                        showWeekNumbers={true}
                        disableAllTouchEventsForDisabledDays={true}
                        enableSwipeMonths={true}
                        />
                    </Center>
                </Flex>
            </Card>
            <Card mt={4} p={4}>
                <Flex>
                    <VStack>
                        <Text fontSize="xl">Next planned donation type:</Text>
                        <Select width="80%" variant='filled' placeholder="Donation Type" defaultValue={"whole"} onValueChange={(value) => fetchInterval(value)}>
                        {donationTypes ? donationTypes.map((donationType) => <Select.Item label={donationType.name} value={donationType.label}/>) : <Select.Item isDisabled label="loading..." value=""/>}
                        </Select>
                    </VStack>
                    <Spacer/>
                    <Center mt={4}>
                        { timeSpan.totalHours<24 ? <Text fontSize="xl">You can donate now!</Text> :
                        <HStack>
                            <Text fontSize="xl">Next donation: </Text>
                            <Text fontSize="xl">{timeSpan.days}</Text>
                            <Text fontSize="xl">days!</Text>
                        </HStack>
                        }
                    </Center>
                </Flex>
            </Card>
        </VStack>
    );
}