import React, { FunctionComponent } from "react";
import { Box, VStack, HStack, Text, Pressable } from "native-base"
import { DonationData } from "../../models/DonationData";
import { Card } from "../common/Card";

export const DonationCard = (props: DonationData) =>
<Card mb={3}>
    <HStack padding={3}>
        <VStack>
            <Text color="red.600" fontSize='2xl'>{props.name}</Text>
            <Text opacity={0.7} fontSize='md'>{props.date.toLocaleDateString()}</Text>
        </VStack>
        <Box flex={1}/>
        <HStack>
            <Text fontSize='4xl'>{props.amount}</Text>
            <Text marginLeft={1} color="red.600" fontSize='2xl'>ml</Text>
        </HStack>
    </HStack>
</Card>