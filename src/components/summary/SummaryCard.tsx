import React from "react";
import { Box, VStack, HStack, Text, Pressable } from "native-base"
import { DonationSummary } from "../../models/DonationData";

export const SummaryCard = (props: DonationSummary) => {
return (
<Pressable>
    <Box padding={1} shadow={2} mx={3} marginBottom={3} rounded={8} bg='white'>
        <Pressable>
        <VStack padding={3}>
            <VStack>
                <Text color="red.600" fontSize='2xl'>{props.name}</Text>
            </VStack>
            <HStack>
                <Text fontSize='xl'>Total: </Text>
                <Text fontSize='2xl' color="red.600">{props.amount}</Text>
                <Text marginLeft={1} fontSize='xl'>ml</Text>
            </HStack>
        </VStack>
        </Pressable>
    </Box>
</Pressable>
)
}