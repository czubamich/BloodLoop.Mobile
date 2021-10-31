import React from 'react'

import { Text, View } from 'react-native'

export default AuthContext = () => {
    constructor() {
        [isLoading, setIsLoading] = React.useState(true)
        [userToken, setUserToken] = React.useState(null)
    }

    readonly context = React.createContext(null);
    readonly authContext = React.useMemo(() => ({
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
}