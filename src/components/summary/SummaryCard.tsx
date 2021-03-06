import React from "react";
import { Box, VStack, HStack, Text, IBoxProps } from "native-base"
import { DonationSummary } from "../../models/DonationData";
import { Card } from "../common/Card";

export interface ISummaryCardProps extends IBoxProps {
    data: DonationSummary
}

export const SummaryCard = (props: ISummaryCardProps) => {
    const {data, children, ...rest} = props;

    return (<Card {...rest}>
        <VStack padding={3}>
            {children}
            <HStack>
                <Text fontSize='xl'>Donations: </Text>
                <Text fontSize='2xl' color="red.600">{data.count}</Text>
            </HStack>
            <HStack>
                <Text fontSize='xl'>Donated: </Text>
                <Text fontSize='2xl' color="red.600">{data.amount}</Text>
                <Text marginLeft={1} fontSize='xl'>ml</Text>
            </HStack>
        </VStack>
    </Card>)
}