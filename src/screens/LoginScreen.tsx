import React, { useState } from 'react';
import { Box, Text, Center, Divider, Stack, FormControl, Input, Button, Checkbox, Icon } from "native-base";
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AuthContext } from '../utils/Context';

export const LoginScreen = () => {
    const nav = useNavigation<StackNavigationProp<any, any>>();
    const [status, setStatus] = useState(false)
    const { signIn } = React.useContext(AuthContext);

    return (
    <Center flex={1} bg="red.500">
        <Box flex={2}>
            <Box flex={1}/>
            <Icon as={MaterialCommunityIcons} name="water" color="white" size={40}/>
            <Box flex={1}/>
        </Box>
        <Box flex={3} shadow={2} mx={3} roundedTop={14} bg='white' padding={4}
            w={{
                base: "100%",
                md: "420",
            }}>
            <FormControl marginTop={2} isInvalid={status}>
                <Stack>
                    <Input 
                        onChangeText={() => setStatus(false)} 
                        variant='filled'
                        placeholder="Email" 
                        InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="account" color="muted.400"/>}/>
                    <Input mt={6} mb={4}
                        onChangeText={() => setStatus(false)} 
                        variant='filled'
                        placeholder="Password" type="password" 
                        InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="lock" color="muted.400"/>}/>
                    <FormControl.ErrorMessage mt={2}>
                        Invalid username and/or password.
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>
            <Divider mb={4} mt={2}/>
            <Text alignSelf="flex-end" mb={6} onPress={() => setStatus(true)} fontSize='sm' color='muted.400'>Forgot password?</Text>
            <Button isLoading={status} isLoadingText="Signing in" variant='solid' colorScheme="red" onPress={() => signIn()}>Sign in</Button>
            <Box flex={1}/>
            <Center>
                <Text color="muted.400" my={4} onPress={() => nav.navigate('SignUp')}>Don't have an account? <Text bold>Sing up!</Text></Text>
            </Center>
        </Box>
    </Center>
    )
}