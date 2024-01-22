// ContextReducer.tsx
import React, { ReactNode } from 'react';

import { createContext, useContext, useReducer } from 'react';
import { User } from '../utils/interfaces';

interface AuthState {
  user: User | null;
}

type AuthAction = { type: 'LOGIN'; payload: User };

const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      console.log('Login successfully:', action.payload);
      return { user: action.payload };

    default:
      return state;
  }
};

// Create Auth Context
const AuthContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<
  React.Dispatch<AuthAction> | undefined
>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthContext.Provider value={state}>
        {children}
      </AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useDispatchAuth = () => {
  const context = useContext(AuthDispatchContext);
  if (!context) {
    throw new Error(
      'useDispatchAuth must be used within a AuthProvider'
    );
  }
  return context;
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
