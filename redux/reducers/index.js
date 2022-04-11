import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import loadingReducers from "./loadingReducers";
import userReducer from "./userReducers";

const reducers = combineReducers({
  user: userReducer,
  loading: loadingReducers,
});

const middlewares = [thunk];

export const store = createStore(reducers, applyMiddleware(...middlewares));
