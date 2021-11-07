import React, {useMemo, useContext, useEffect} from "react";
import { NativeBaseProvider, Box, StatusBar, View, Center } from "native-base";
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { AppBar } from "./src/components/common/AppBar"
import { NavBar } from "./src/components/common/NavBar"
import { DonationsScreen } from "./src/screens/AppStack/DonationsScreen";
import { CalendarScreen } from "./src/screens/AppStack/CalendarScreen";
import { SummaryScreen } from "./src/screens/AppStack/SummaryScreen";
import { SignInScreen } from "./src/screens/AuthStack/SignInScreen";
import { SignUpScreen } from "./src/screens/AuthStack/SignUpScreen";
import { SplashScreen } from "./src/screens/InitStack/SplashScreen";

import "./src/locale"
import { theme } from "./src/theme"


import { AuthContext, AuthProvider, useAuth } from "./src/components/AuthProvider";
import { Routes } from "./src/screens/Routes";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const isSignedIn = true;

export const App = () => {
  const HomeScreen = () => {
    return (
      <Tab.Navigator
        initialRouteName={Routes.Summary}
        backBehavior="initialRoute"
        tabBar={props => <NavBar {...props}/>}
        screenOptions={({ route }) => ({
        header: ({route}) => <AppBar title={route.name}/>
      })}>
        <Tab.Screen name={Routes.Calendar} component={CalendarScreen} />
        <Tab.Screen name={Routes.Summary} component={SummaryScreen} />
        <Tab.Screen name={Routes.History} component={DonationsScreen} />
      </Tab.Navigator>
    )
  }

  const AppStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Routes.HomeScreen} component={HomeScreen} />
      </Stack.Navigator>
    );
  };
  
  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Routes.SignIn} component={SignInScreen} />
        <Stack.Screen name={Routes.SignUp} component={SignUpScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <AuthProvider>
      <NativeBaseProvider theme={theme}>
          <StatusBar backgroundColor={"#EF4444"} animated={true} />
          <Box safeAreaTop bg={"red.500"} />
          <Box flex={1}>
            <NavigationContainer>
              <AuthContext.Consumer> 
                {(value) => value?.authData ? <AppStack/> : <AuthStack/>}
              </AuthContext.Consumer>
            </NavigationContainer>
          </Box>
      </NativeBaseProvider>
    </AuthProvider>
  );
}

export default App