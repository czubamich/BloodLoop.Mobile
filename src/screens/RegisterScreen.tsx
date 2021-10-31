import React, { useState } from 'react';
import { Box, Spacer, Text, Center, Divider, Stack, FormControl, Input, Button, Checkbox, Icon, HStack, Select, ScrollView, Flex } from "native-base";
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AuthContext } from '../utils/Context';

export const RegisterScreen = () => {
    const nav = useNavigation<StackNavigationProp<any, any>>();
    const [status, setStatus] = useState(false)
    const { signUp } = React.useContext(AuthContext);

    return (
    <Center flex={1} bg="red.500">
        <Box flex={1}>
            <Box flex={1}/>
            <Icon as={MaterialCommunityIcons} name="heart-plus" color="white" size={40}/>
            <Box flex={1}/>
        </Box>
        <Box flex={3} shadow={2} roundedTop={14} bg='white' mx={3}
            w={{
                base: "100%",
                md: "420",
            }}>
            <ScrollView minHeight="100%" px={4}>
            <FormControl marginTop={2} isInvalid={status}>
                <Stack>
                    <Input  mt={4}
                        variant='filled'
                        placeholder="Email" type="email"
                        InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="email" color="muted.400"/>}/>
                    <Flex flex={1} flexDirection="row" mt={4}>
                        <Input
                            flex={1}
                            variant='filled'
                            placeholder="Firstname"/>
                        <Box mx={0.5}/>
                        <Input
                            flex={1}
                            variant='filled'
                            placeholder="Lastname"/>
                    </Flex>
                    <Input mt={4}
                        variant='filled'
                        placeholder="Birthday"
                        InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="calendar-star" color="muted.400"/>}/>
                <HStack mt={4} flex={1} flexDirection="row">
                    <Select flex={1} variant='filled' placeholder="Gender">
                        <Select.Item label="Male" value="male" />
                        <Select.Item label="Female" value="female" />
                    </Select>
                    <Box mx={0.5}/>
                    <Select flex={1} variant='filled' placeholder="Blood type">
                        <Select.Item label="A Rh+" value="A Rh+" />
                        <Select.Item label="A Rh-" value="A Rh-" />
                        <Select.Item label="B Rh+" value="B Rh+" />
                        <Select.Item label="B Rh-" value="B Rh-" />
                        <Select.Item label="AB Rh+" value="AB Rh+" />
                        <Select.Item label="AB Rh-" value="AB Rh-" />
                        <Select.Item label="0 Rh+" value="zeroplus" />
                        <Select.Item label="0 Rh-" value="zerominus" />
                    </Select>
                </HStack>
                    <Divider my={4}/>
                    <Input
                        variant='filled'
                        placeholder="Password" type="password" 
                        InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="lock" color="muted.400"/>}/>
                    <Input mt={4} mb={4}
                        variant='filled'
                        placeholder="Confirm password" type="password" 
                        InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="lock-question" color="muted.400"/>}/>
                    <FormControl.ErrorMessage mt={2}>
                        Invalid username and/or password.
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>
            <Divider mb={4} mt={2}/>
            <Button isLoading={status} isLoadingText="Signing in" variant='solid' colorScheme="red" onPress={() => signUp()}>Sign up</Button>
            <Box flex={1}/>
            <Text alignSelf="center" color="muted.400" my={4} onPress={() => nav.navigate('SignIn')}>Already have an account? <Text bold>Sing in!</Text></Text>
            </ScrollView>
        </Box>
    </Center>
    )
}