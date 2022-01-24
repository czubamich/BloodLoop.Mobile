import React, { useState } from 'react';
import { Box, Spacer, Text, Center, Divider, Stack, FormControl, Input, Button, Icon, HStack, Select, ScrollView } from "native-base";
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';
import { AccountsClient, DictionariesClient, GenderType, IBloodTypeDto, IRegisterDonorCommand, RegisterDonorCommand } from '../../utils/api/ApiClient';
import { Routes } from '../Routes';
import { useAuth } from '../../components/AuthProvider';
import { config } from '../../config';

export const SignUpScreen = () => {
    const nav = useNavigation<StackNavigationProp<any, any>>();
    const authContext = useAuth()
    const [status, setStatus] = useState(false)
    const [errors, setErrors] = React.useState<string>(undefined)
    const [formData, setFormData] = React.useState<IRegisterDonorCommand>({birthDay: new Date(), bloodTypeLabel: "a_rh_plus", gender: GenderType.Male})
    const [bloodTypes, setBloodTypes] = React.useState<IBloodTypeDto[]>(undefined)
    const [showDatePicker, setShowDatePicker] = React.useState(false)

    React.useEffect(() => {
        async function fetchBloodTypes() {
            var apiClient = new DictionariesClient(config.apiUrl)
            var bloodTypes = await apiClient.getBloodTypes()
            setBloodTypes(bloodTypes)
          }

          fetchBloodTypes()
    }, [])

    const updateForm = (signUpData: IRegisterDonorCommand) => {
        setErrors(undefined)
        setFormData(signUpData)
    }

    const onSignUp = async () => {
        setStatus(true)
        try {
            var accountClient = new AccountsClient(config.apiUrl)
            await accountClient.registerDonor(new RegisterDonorCommand(formData))
                .then(() => authContext.signIn(formData.email, formData.password))
                .then(() => nav.navigate(Routes.SignIn))
        }
        catch(e)
        {
            var errors = JSON.parse(e.response)
            setErrors(Object.values(errors.errors).map(prop => prop.toString()).join("\n"));
        }
        setStatus(false)
    }

    return (
    <Center flex={1} bg="primary.400">
        <Center flex={2}>
            <Icon as={MaterialCommunityIcons} name="tooltip-plus" color="white" size={40}/>
        </Center>
        <Box flex={3} shadow={2} roundedTop={14} bg='white'
            w={{
                base: "100%",
                md: "420",
            }}>
            <ScrollView contentContainerStyle={{flexGrow: 1}} px={4}>
            <FormControl isRequired isInvalid={!errors==undefined}>
            <Stack>
                <Input mt={5}
                        value={formData?.email}
                        onChangeText={(value) => updateForm({...formData, email: value})}
                        variant='filled'
                        placeholder="Email" type="email"
                        InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="email" color="muted.400"/>}/>
                <HStack mt={4}>
                    <Input
                        value={formData?.firstName}
                        onChangeText={(value) => updateForm({...formData, firstName: value})}
                        width="49%"
                        variant='filled'
                        placeholder="Firstname"/>
                    <Spacer maxWidth="2%"/>
                    <Input
                        value={formData?.lastName}
                        onChangeText={(value) => updateForm({...formData, lastName: value})}
                        width="49%"
                        variant='filled'
                        placeholder="Lastname"/>
                </HStack>
                    <Input mt={4}
                        value={formData?.birthDay?.toISOString().substring(0, 10)}
                        onFocus={()=>setShowDatePicker(true)}
                        variant='filled'
                        placeholder="Birthday"
                        InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="calendar-star" color="muted.400"/>}/>
                <HStack mt={4}>
                    <Select width="49%" variant='filled' placeholder="Gender" defaultValue="-" onValueChange={(value) => updateForm({...formData, gender: value == "m" ? GenderType.Male : GenderType.Female})}>
                        <Select.Item label="Male" value={"m"}/>
                        <Select.Item label="Female" value={"f"}/>
                    </Select>
                    <Spacer maxWidth="2%"/>
                    <Select width="49%" variant='filled' placeholder="Blood type" defaultValue="-" onValueChange={(value) => updateForm({...formData, bloodTypeLabel: value})}>
                        {bloodTypes ? bloodTypes.map((bloodType) => <Select.Item label={bloodType.symbol} value={bloodType.label}/>) : <Select.Item isDisabled label="loading..." value=""/>}
                    </Select>
                </HStack>
                <Divider my={4}/>
                    <Input
                        variant='filled'
                        onChangeText={(value) => updateForm({...formData, password: value})}
                        placeholder="Password" type="password" 
                        InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="lock" color="muted.400"/>}/>
                    <Input mt={4} mb={4}
                        variant='filled'
                        onChangeText={(value) => updateForm({...formData, confirmPassword: value})}
                        placeholder="Confirm password" type="password" 
                        InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="lock-question" color="muted.400"/>}/>
            </Stack>
                <Divider mb={4} mt={2}/>
                {errors!=undefined ? <Text mb={4} color="red.500">{errors}</Text> : <></>}
                <Button isLoading={status} isLoadingText="Signing in" variant='solid' colorScheme="red" onPress={onSignUp}>Sign up</Button>
            </FormControl>
            <Center mt="auto">
                <Text color="muted.400" my={6} onPress={() => nav.navigate(Routes.SignIn)}>Already have an account? <Text bold>Sing in!</Text></Text>
            </Center>
            </ScrollView>
        </Box>
        {showDatePicker &&
        <DateTimePicker
            value={formData?.birthDay ?? new Date()}
            mode={"date"}
            display="default"
            onChange={(event, value) => {setShowDatePicker(false); setFormData({...formData, birthDay: value})}}/>}
    </Center>
    )
}