import React, {useMemo, useContext, useEffect} from "react";
import { NativeBaseProvider, Box, StatusBar, View, Center } from "native-base";
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getHeaderTitle } from '@react-navigation/elements';

import { AppBar } from "./src/components/common/AppBar"
import { NavBar } from "./src/components/common/NavBar"
import { DonationsScreen } from "./src/screens/DonationsScreen";
import { CalendarScreen } from "./src/screens/CalendarScreen";
import { SummaryScreen } from "./src/screens/SummaryScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { RegisterScreen } from "./src/screens/RegisterScreen";

import "./src/locale"
import { theme } from "./src/theme"
import { LoadingScreen } from "./src/screens/LoadingScreen";

import { AuthContext } from "./src/utils/Context";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const isSignedIn = true;

export const App = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [userToken, setUserToken] = React.useState(null)

  const authContext = useMemo(() => ({
    signIn: () => {
      setUserToken("token")
      setIsLoading(false)
    },
    signUp: () => {
      setUserToken("token")
      setIsLoading(false)
    },
    signOut: () => {
      setUserToken(null)
      setIsLoading(false)
    },
  }), null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if(isLoading) {
    return(
      <NativeBaseProvider theme={theme}>
        <Center flex={1}>
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Center>
      </NativeBaseProvider>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NativeBaseProvider theme={theme}>
          <StatusBar backgroundColor={"#EF4444"} animated={true} />
          <Box safeAreaTop bg={"red.500"} />
          <Box flex={1}>
            <NavigationContainer>
            { userToken != null ? (
              <Tab.Navigator
                initialRouteName="Summary"
                backBehavior="initialRoute"
                tabBar={props => <NavBar {...props}/>}
                screenOptions={({ route }) => ({
                header: ({route}) => <AppBar title={route.name}/>
                })}>
                <Tab.Screen name='Calendar' component={CalendarScreen} />
                <Tab.Screen name='Summary' component={SummaryScreen} />
                <Tab.Screen name='History' component={DonationsScreen} />
              </Tab.Navigator>
              ) : (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SignIn" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={RegisterScreen} />
              </Stack.Navigator>
              )
            }
            </NavigationContainer>
          </Box>
      </NativeBaseProvider>
    </AuthContext.Provider>
  );
}

export default App