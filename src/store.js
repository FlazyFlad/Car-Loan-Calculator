import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import getCarsReducer from "./reducers/getCarsReducer";


const rootReducer = combineReducers({
    cars: getCarsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;