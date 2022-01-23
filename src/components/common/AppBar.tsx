import React from "react";
import { HStack, IconButton, Icon, Text, Menu, Button, Modal, FormControl, Input, Center, Select, NumberInput } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from "../AuthProvider";
import { AboutModal } from "./AboutModal";
import { AddDonationModal } from "../donations/AddDonationModal";

interface AppBarData
{
    title: String
}

export const AppBar = (props: AppBarData) => {
  const { signOut } = React.useContext(AuthContext);
  const [donationModalActive, setDonationModalActive] = React.useState(false)
  const [aboutModalActive, setAboutModalActive] = React.useState(false)

  return (
    <>
    <HStack bg='red.500' px={1} py={2} justifyContent='space-between' alignItems='center' shadow={4}>
      <HStack space={4} alignItems='center'>
        <Text marginLeft={2} 
          color="white" 
          fontSize={20} 
          fontWeight='bold'>
        </Text>
      </HStack>
      <HStack space={2}>
        <Menu w={48} trigger={(triggerProps) => 
          <IconButton {...triggerProps} icon={<Icon as={<MaterialIcons name='more-vert' />} size='sm' color="white" />} />
        }>
          <Menu.Item >
            <Text onPress={() => {setDonationModalActive(true)}}>Add a Donation</Text>
          </Menu.Item>
          <Menu.Item>
            <Text onPress={() => {setAboutModalActive(true)}}>About</Text>
          </Menu.Item>
          <Menu.Item>
            <Text onPress={() => {signOut()}}>Sign Out</Text>
          </Menu.Item>
        </Menu>
      </HStack>
    </HStack>
    <AddDonationModal isOpen={donationModalActive} onClose={() => setDonationModalActive(false)}/>
    <AboutModal isOpen={aboutModalActive} onClose={() => setAboutModalActive(false)}/>
    </>
  )
}
