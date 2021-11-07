import React, { useState } from 'react';
import { Box, Text, Center, Divider, Stack, FormControl, Input, Button, Checkbox, Icon } from "native-base";
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../components/AuthProvider';

interface ISignUpData
{
    email: string,
    password: string
}

export const SignInScreen = () => {
    const nav = useNavigation<StackNavigationProp<any, any>>();
    const [formData, setFormData] = React.useState<ISignUpData | undefined>(undefined)
    const [status, setStatus] = React.useState(false)
    const [errors, setErrors] = React.useState<string>(undefined)
    const authContext = useAuth()
    const onSignIn = async () => {
        setStatus(true)
        let result = await authContext.signIn(formData.email, formData.password)
        if(result.success == false)
            setErrors(result.message)
        else
            setErrors(undefined)

        setStatus(false)
    }

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
            <FormControl marginTop={2} isInvalid={errors != undefined}>
                <Stack>
                    <Input 
                        onChangeText={(value) => setFormData({...formData, email: value})}
                        variant='filled'
                        placeholder="Email"
                        InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="account" color="muted.400"/>}/>
                    <Input mt={6} mb={4}
                        onChangeText={(value) => setFormData({...formData, password: value})} 
                        variant='filled'
                        placeholder="Password" type="password" 
                        InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="lock" color="muted.400"/>}/>
                    <FormControl.ErrorMessage mt={2}>
                        {errors}
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>
            <Divider mb={4} mt={2}/>
            {/* <Text alignSelf="flex-end" mb={6} fontSize='sm' color='muted.400'>Forgot password?</Text> */}
            <Button isLoading={status} isLoadingText="Signing in" variant='solid' colorScheme="red" onPress={onSignIn}>Sign in</Button>
            <Box flex={1}/>
            <Center>
                <Text color="muted.400" my={4} onPress={() => nav.navigate('SignUp')}>Don't have an account? <Text bold>Sing up!</Text></Text>
            </Center>
        </Box>
    </Center>
    )
}