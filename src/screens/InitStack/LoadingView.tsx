import React from 'react';
import { Center, Spinner } from "native-base";

export const LoadingView = () => {
    return (
    <Center flex={1}>
        <Spinner size={100} color="red.400"/>
    </Center>
    )
}