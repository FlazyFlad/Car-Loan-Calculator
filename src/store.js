import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import getCarsReducer from "./reducers/getCarsReducer";
import authReducer from './reducers/authReducer';
import bankReducer from "./reducers/banksReducer";

const rootReducer = combineReducers({
    cars: getCarsReducer,
    auth: authReducer,
    banks: bankReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;