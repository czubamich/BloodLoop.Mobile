import React from "react";
import { HStack, IconButton, Icon, Text, Menu, Button } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from "../AuthProvider";
import { Pressable } from "react-native";

interface AppBarData
{
    title: String
}

export const AppBar = (props: AppBarData) => {
  const { signOut } = React.useContext(AuthContext);
  
  return (
    <HStack bg='red.500' px={1} py={2} justifyContent='space-between' alignItems='center' shadow={4}>
      <HStack space={4} alignItems='center'>
        <Text marginLeft={2} 
          color="white" 
          fontSize={20} 
          fontWeight='bold'>
          {props.title}
        </Text>
      </HStack>
      <HStack space={2}>
        <Menu w={48} trigger={(triggerProps) => 
          <IconButton {...triggerProps} icon={<Icon as={<MaterialIcons name='more-vert' />} size='sm' color="white" />} />
        }>
          <Menu.Item isDisabled>About</Menu.Item>
          <Menu.Item>
            <Text onPress={() => {signOut()}}>Sign Out</Text>
          </Menu.Item>
        </Menu>
      </HStack>
    </HStack>
  )
}
