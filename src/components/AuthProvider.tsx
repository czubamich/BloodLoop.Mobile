import React, {createContext, useState, useContext} from 'react';
import AuthService from '../services/AuthService';
import AuthData from "../models/AuthData"
import { AuthenticationResult } from '../utils/api/ApiClient';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type AuthContextData = {
  authData?: AuthData;
  isLoading: boolean;
  signIn(login: string, password: string): Promise<AuthenticationResult>;
  refresh(): Promise<boolean>;
  signOut(): void;
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export const AuthProvider: React.FC = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>(undefined);
  const authService = new AuthService()
  const [isLoading, setLoading] = useState(true);

  //TODO: Restore auth from asyncStorage
  //

  const signIn = async (email: string, password: string) => {
      let _authResponse = await authService.signIn(
        email,
        password,
      )

      if (_authResponse.success)
        setAuthData({
          email: email, 
          token: _authResponse.accessToken.token, 
          refreshToken: _authResponse.refreshToken.token
        })
      else
          await signOut()
      console.log(authData);
      return _authResponse
  };

  const refresh = async () => {
    let _refreshResponse = await authService.refresh(
      authData.refreshToken
    )

    if (_refreshResponse.success)
        setAuthData({
          email: authData.email, 
          token: _refreshResponse.accessToken.token, 
          refreshToken: _refreshResponse.refreshToken.token
        })
    else
        await signOut()

    return _refreshResponse.success
  }

  const signOut = async () => {
    setAuthData(undefined);
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{authData, isLoading, signIn, refresh, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};