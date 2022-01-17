import React, { useRef, useState } from 'react';
import { Box, Text, Center, Divider, Stack, FormControl, Input, Button, Checkbox, Icon, useBreakpointValue } from "native-base";
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../components/AuthProvider';
import { Routes } from '../Routes';

interface ISignUpData
{
    email: string,
    password: string
}

export const SignInScreen = () => {
    const nav = useNavigation<StackNavigationProp<any, any>>();
    const authContext = useAuth()
    const email = useRef(authContext.authData)
    const [formData, setFormData] = React.useState<ISignUpData>({email: authContext.authData?.email, password:""})
    const [status, setStatus] = React.useState(false)
    const [errors, setErrors] = React.useState<string>(undefined)

    const updateForm = (signInData: ISignUpData) => {
        setFormData(signInData)
        setErrors(undefined)
    }

    const onSignIn = async () => {
        if (formData?.email == undefined || formData?.password == undefined) {
            setErrors("Email/password are required")
            return
        }

        setStatus(true)
        let result = await authContext.signIn(formData.email, formData.password)
        if(result.success == false)
            setErrors(result.message)
        else
            setErrors(undefined)

        setStatus(false)
    }

    return (
    <Center flex={1} bg="primary.400">
        <Center flex={1}>
            <Icon as={MaterialCommunityIcons} name="water" color="white" size={40}/>
        </Center>
        <Box flex={2} shadow={2} roundedTop={14} bg='white' px={4}
            w={{
                base: "100%",
                md: "420",
            }}>
            <FormControl isInvalid={errors != undefined}>
                <Stack>
                    <Input mt={5}
                        value={formData.email}
                        onChangeText={(value) => updateForm({...formData, email: value})}
                        variant='filled'
                        placeholder="Email"
                        InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="account" color="muted.400"/>}/>
                    <Input mt={4} mb={4}
                        onChangeText={(value) => updateForm({...formData, password: value})} 
                        variant='filled'
                        placeholder="Password" type="password" 
                        InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="lock" color="muted.400"/>}/>
                    <FormControl.ErrorMessage mt={2}>
                        {errors}
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>
            <Divider mb={4} mt={2}/>
            <Text alignSelf="flex-end" mb={6} fontSize='sm' color='muted.400'>Forgot password?</Text>
            <Button isLoading={status} isLoadingText="Signing in" variant='solid' colorScheme="red" onPress={onSignIn}>Sign in</Button>
            <Center mt="auto">
                <Text color="muted.400" my={6} onPress={() => nav.navigate(Routes.SignUp)}>Don't have an account? <Text bold>Sing up!</Text></Text>
            </Center>
        </Box>
    </Center>
    )
}