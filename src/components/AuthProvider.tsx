import React, {createContext, useState, useContext, useEffect} from 'react';
import AuthService from '../services/AuthService';
import AuthData from "../models/AuthData"
import { AuthenticationResult, JwtToken } from '../utils/api/ApiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoadingView } from '../screens/InitStack/LoadingView';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type AuthContextData = {
  authData?: AuthData;
  isLoading: boolean;
  signIn(login: string, password: string): Promise<AuthenticationResult>;
  refresh(): Promise<boolean>;
  signOut(): void;
  reload(): void;
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export const AuthProvider: React.FC = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>({email: "", token: "", tokenExpiresAt: new Date(0), refreshToken: "", refreshExpiresAt: new Date(0)});
  const authService = new AuthService();
  const [isLoading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
      let _authResponse = await authService.signIn(
        email,
        password,
      )

      if (_authResponse.success) {
        await AsyncStorage.setItem("email", email)
        await AsyncStorage.setItem("refreshToken", _authResponse.refreshToken.token)
        setAuthData({
          email: email, 
          token: _authResponse.accessToken.token, 
          tokenExpiresAt: _authResponse.accessToken.expireAt,
          refreshToken: _authResponse.refreshToken.token,
          refreshExpiresAt: _authResponse.refreshToken.expireAt,
        })
      } else
          await signOut()

      return _authResponse
  };

  const verify = (_refreshToken) => {
    return _refreshToken != null
      && _refreshToken != undefined
      && _refreshToken != ""
  }

  const refreshFunc = async (refreshToken) =>
  {
    if(!verify(refreshToken))
      return;

    let _refreshResponse = await authService.refresh(
      refreshToken
    )

    if (_refreshResponse.success) {
        await AsyncStorage.setItem("refreshToken", _refreshResponse.refreshToken.token)
        setAuthData({
          ...authData,
          token: _refreshResponse.accessToken.token,
          tokenExpiresAt: _refreshResponse.accessToken.expireAt,
          refreshToken: _refreshResponse.refreshToken.token,
          refreshExpiresAt: _refreshResponse.refreshToken.expireAt,
        })
    } else
        await signOut()

    return _refreshResponse.success
  }

  const reload = () => {
    setLoading(true)
    setLoading(false)
  }

  const refresh = async () => {
    if (new Date(Date.now() + 60000*10) <= authData.tokenExpiresAt)
      return await refreshFunc(authData.refreshToken)
  }

  const signOut = async () => {
    setAuthData({...authData, refreshToken: "", token: ""});
    await AsyncStorage.setItem("refreshToken", "")
  };

  useEffect(() => {
    async function _loadData() {
      var _email = await AsyncStorage.getItem("email");
      var _refreshToken = await AsyncStorage.getItem("refreshToken");
      
      setAuthData({...authData, email: _email ?? "", refreshToken: _refreshToken ?? ""})
      await refreshFunc(_refreshToken)
      setLoading(false)
    }

    _loadData()
  }, [])
  
  return (
    <AuthContext.Provider value={{authData, isLoading, signIn, refresh, signOut, reload}}>
      {children}
    </AuthContext.Provider>
  );
};