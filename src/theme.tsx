import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';

export const theme = extendTheme({
    config: {
        useSystemColorMode: false,
        initialColorMode: 'light',
    }
});