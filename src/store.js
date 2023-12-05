import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import getCarsReducer from "./reducers/getCarsReducer";
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    cars: getCarsReducer,
    auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;