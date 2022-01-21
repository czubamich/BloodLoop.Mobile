import React from "react";
import { Box, VStack, HStack, Text, Pressable } from "native-base"
import { DonationSummary } from "../../models/DonationData";
import { Card } from "../common/Card";
import { ISummaryCardProps } from "./SummaryCard";

export const DonationIntervalCard = (props: ISummaryCardProps) => {
    const {data, children, ...rest} = props;

    return (<Card {...rest}>
        <VStack padding={3}>
            {children}
            <VStack>
                <Text color="red.600" fontSize='2xl'>{data.name}</Text>
            </VStack>
            <HStack>
                <Text fontSize='xl'>Total: </Text>
                <Text fontSize='2xl' color="red.600">{data.amount}</Text>
                <Text marginLeft={1} fontSize='xl'>ml</Text>
            </HStack>
        </VStack>
    </Card>)
}