// ContextReducer.tsx
import React, { ReactNode } from 'react';

import { createContext, useContext, useReducer } from 'react';
import { FoodItem } from '../utils/interfaces';

// Define the cart item structure
interface CartItem extends FoodItem {
  quantity: number;
}

// Define the cart state and actions
interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: FoodItem }
  | { type: 'REMOVE_ITEM'; payload: FoodItem }
  | { type: 'INCREMENT_ITEM'; payload: FoodItem }
  | { type: 'DECREMENT_ITEM'; payload: FoodItem }
  | { type: 'SET_ITEMS'; payload: FoodItem[] }; // Added action type


  const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
      case 'ADD_ITEM':
      console.log('Adding item to cart:', action.payload);
      
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
        return { items: [...state.items] };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };

    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(item => item._id !== action.payload._id),
      };

      case 'INCREMENT_ITEM':
        return {
          items: state.items.map((item) =>
            item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
        case 'DECREMENT_ITEM':
          return {
            items: state.items
              .map((item) =>
                item._id === action.payload._id
                  ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
                  : item
              )
              .filter((item) => item.quantity > 0),
          };
      case 'SET_ITEMS':
        return {
          items: action.payload,
        };

    default:
      return state;
  }
};


// Create Cart Context
const CartContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<React.Dispatch<CartAction> | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartDispatchContext.Provider value={dispatch}>
    <CartContext.Provider value={state}>
      {children}
    </CartContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useDispatchCart = () => {
  const context = useContext(CartDispatchContext);
  if (!context) {
    throw new Error('useDispatchCart must be used within a CartProvider');
  }
  return context;
};

export const useCart = (): CartState => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
