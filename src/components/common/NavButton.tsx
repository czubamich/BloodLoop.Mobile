import React, {ReactNode} from "react";
import { Text, Icon, Center, Pressable } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface NavOption
{
    text: String;
    icon: any;
    isFocused: Boolean;
    onPress: Function;
}

export const NavButton = (props: NavOption) =>
<Pressable  
    opacity={props.isFocused === true ? 1 : 0.5}
    py={2.5}
    flex={1}
    onPress={() => props.onPress()}>
    <Center>
        <Icon
            color="white" size="sm"
            as={MaterialCommunityIcons}
            name={props.icon}
            />
        <Text color="white" fontSize={12}>
            {props.text}
        </Text>
    </Center>
</Pressable>
