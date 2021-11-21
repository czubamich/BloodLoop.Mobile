import React from 'react';
import { Center, Box, Icon } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export class SplashScreen extends React.Component {
    render() {
        return (
        <Center flex={1}>
            <Box flex={1}/>
            <Icon as={MaterialCommunityIcons} name="water" color="white" size={40}/>
            <Box flex={1}/>
        </Center>
        )}
}