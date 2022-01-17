import React, { FunctionComponent } from "react";
import { Box, VStack, HStack, Text, Pressable, Center } from "native-base"
import { DonationData } from "../../models/DonationData";
import { Card } from "../common/Card";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export const DonationCard = (props: DonationData, ...rest: any[]) => 
<Card mb={3} {...rest}>
    <HStack padding={3}>
        <VStack>
            <Text color="red.600" fontSize='2xl'>{capitalizeFirstLetter(props.name)}</Text>
            <Text color="muted.400" fontSize='md'>{props.date.toLocaleDateString()}</Text>
        </VStack>
        <Box flex={1}/>
        <HStack>
            <Text fontSize='4xl'>{props.amount}</Text>
            <Text marginLeft={1} color="red.600" fontSize='2xl'>ml</Text>
        </HStack>
    </HStack>
    <Center><Text color="muted.400" fontSize='md'>{props.location}</Text></Center>
</Card>