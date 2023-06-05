import {createContext} from 'react';

type AuthContextProps = {
  errorMessage: string;
};

const AuthContext = createContext({});
