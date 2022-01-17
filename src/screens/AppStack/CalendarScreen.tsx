import React from 'react';
import { View, Text, Center, ScrollView, SectionList, Divider, VStack, Select, HStack, Flex, Spacer } from "native-base";
import {Calendar} from 'react-native-calendars';
import { Card } from '../../components/common/Card';

export class CalendarScreen extends React.Component {
    render() {
        return (
        <VStack flex={1} py={4}>
            <Card>
                <Flex>
                    <Center width="auto">
                        <Calendar
                        current={'2021-12-21'}
                        minDate={'2021-12-21'}
                        maxDate={'2022-03-09'}
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
                        <Text fontSize="xl">Next planned donation type</Text>
                        <Select mt={4} width="80%" variant='filled' placeholder="Donation Type" defaultValue="whole">
                            <Select.Item label="Whole" value={"whole"}/>
                            <Select.Item label="Platelets" value={"platelets"}/>
                            <Select.Item label="Plasma" value={"plasma"}/>
                        </Select>
                    </VStack>
                    <Spacer/>
                    <Center mt={4}>
                        <HStack>
                            <Text fontSize="xl">You can donate now!</Text>
                        </HStack>
                    </Center>
                </Flex>
            </Card>
        </VStack>
    )}
}