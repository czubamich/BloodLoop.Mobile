import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';

export const theme = extendTheme({
    config: {
        useSystemColorMode: false,
        initialColorMode: 'light',
    },
    colors: {
        primary: 
        {
            50: '#ffe5e5',
            100: '#fbbaba',
            200: '#f28e8e',
            300: '#eb6161',
            400: '#e43535',
            500: '#ca1b1b',
            600: '#9e1314',
            700: '#710c0e',
            800: '#460506',
            900: '#1e0000',
          },
        secondary: 
        {
          50: '#e2fbed',
          100: '#c2ebd4',
          200: '#9fddb9',
          300: '#7ccf9e',
          400: '#58c184',
          500: '#3ea76a',
          600: '#2e8251',
          700: '#1f5d3a',
          800: '#0f3921',
          900: '#001506',
        }
    }
});