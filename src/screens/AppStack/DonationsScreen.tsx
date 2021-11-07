import React from 'react';
import { Text, Center, ScrollView, SectionList, Divider } from "native-base";
import { DonationCard } from '../../components/donations/DonationCard';

export class DonationsScreen extends React.Component {
  data = [
    {
      year: 2021,
      data: [
        { name: "Krew Pełna", date: new Date(), amount: 450 },
        { name: "Krew Pełna", date: new Date("2021-05-07"), amount: 450 },
        { name: "Krew Pełna", date: new Date("2021-02-05"), amount: 450 }
      ]
    },
    {
      year: 2020,
      data: [
        { name: "Krew Pełna", date: new Date("2020-12-17"), amount: 450 },
        { name: "Krew Pełna", date: new Date("2020-05-14"), amount: 450 },
        { name: "Krew Pełna", date: new Date("2020-01-11"), amount: 450 },
      ]
    },
    {
      year: 2019,
      data: [
        { name: "Krew Pełna", date: new Date("2019-06-22"), amount: 450 },
        { name: "Krew Pełna", date: new Date("2019-01-14"), amount: 450 }
      ]
    }
  ];
  state = {
    refreshing: false
  };

  render() {
    return (
      <SectionList
        sections={this.data}
        renderItem={({ item }) => (<DonationCard name={item.name} date={item.date} amount={item.amount} />)}
        renderSectionHeader={({ section: { year } }) => <Center my={2}><Text fontSize="xl">{year}</Text></Center>}
        renderSectionFooter={(section) => <Divider />}
        refreshing={this.state.refreshing}
        onRefresh={() => this.state.refreshing = true} />
    );
  }
}
