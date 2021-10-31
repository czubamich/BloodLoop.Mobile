import React from "react";
import { Box, VStack, HStack, Text, Pressable } from "native-base"

interface DonationData
{
    name: String;
    date: Date;
    amount: String;
}

export const DonationCard = (props: DonationData) => {
return (
<Pressable>
    <Box padding={1} shadow={2} mx={3} marginBottom={3} rounded={8} bg='white'>
        <Pressable>
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
        </Pressable>
    </Box>
</Pressable>
)
}