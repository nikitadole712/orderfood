// AuthContext.tsx

import React, { createContext, useContext, useReducer } from 'react';
import { User } from '../utils/interfaces';

// Define the shape of the authentication state
interface AuthState {
  user: User | null;
}

// Define the actions that can be dispatched to update the authentication state
type AuthAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SIGNUP'; payload: User }; // Add a new SIGNUP action

// Define the reducer function to handle state updates based on dispatched actions
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
    case 'SIGNUP': // Handle SIGNUP action by updating the user state
      console.log('Authentication successful:', action.payload);
      return { user: action.payload };
    case 'LOGOUT':
      console.log('Logout successful');
      return { user: null };
    default:
      return state;
  }
};

// Create Auth Context
const AuthContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<
  React.Dispatch<AuthAction> | undefined
>(undefined);

// AuthProvider component
interface AuthProviderProps {
  children: React.ReactNode;
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

// Custom hook to get the authentication state
export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Custom hook to get the dispatch function
export const useDispatchAuth = (): React.Dispatch<AuthAction> => {
  const context = useContext(AuthDispatchContext);
  if (!context) {
    throw new Error('useDispatchAuth must be used within an AuthProvider');
  }
  return context;
};
