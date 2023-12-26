import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import getCarsReducer from "./reducers/getCarsReducer";
import authReducer from './reducers/authReducer';
import bankReducer from "./reducers/banksReducer";
import favoritesReducer from "./reducers/favoritesReducer";

const rootReducer = combineReducers({
    cars: getCarsReducer,
    auth: authReducer,
    banks: bankReducer,
    favorite: favoritesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;