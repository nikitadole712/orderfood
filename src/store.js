import { combineReducers } from "redux";

import {createStore} from "redux";

import {applyMiddleware} from "redux"

import thunk from "redux-thunk";

import {composeWithDevTools} from "redux-devtools-extension";

import { getAllFoodReducer } from "./foodReducer";

const finalReducer = combineReducers({

    getAllFoodReducer:getAllFoodReducer
})
const initialState={}

const composeEnhancers= composeWithDevTools({})

const store= createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

export default store