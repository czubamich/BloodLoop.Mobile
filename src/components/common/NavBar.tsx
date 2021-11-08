import React, { useState } from "react";
import {
    Box,
    HStack,
    Center,
    View,
  } from 'native-base';
import { NavButton } from './NavButton'
import { NavigationContainerRef } from "@react-navigation/core";
import { Routes } from "../../screens/Routes";

export function NavBar({ state, descriptors, navigation }) {
    return (
    <Box shadow={6}>
    <Center bg="white" safeAreaTop flex={1}/>
    <HStack bg="red.500" alignItems="center" safeAreaBottom>
        {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        let icon = ""
        if (route.name === Routes.Calendar)
          icon = "calendar"
        else if (route.name === Routes.Summary)
          icon = "home-variant"
        else if (route.name === Routes.History)
          icon = "clipboard-text"

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
            <NavButton onPress={onPress} icon={icon} text={label} isFocused={isFocused}/>
        )}
    )}
    </HStack>
    </Box>
    )
}