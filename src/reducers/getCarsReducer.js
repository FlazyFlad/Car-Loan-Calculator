const initialState = {
    cars: [],
    loading: false,
    error: null,
};

const getCarsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CARS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'GET_CARS_SUCCESS':
            return {
                ...state,
                loading: false,
                cars: action.payload,
            };
        case 'GET_CARS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                cars: [],
            };
        default:
            return state;
    }
};

export default getCarsReducer;