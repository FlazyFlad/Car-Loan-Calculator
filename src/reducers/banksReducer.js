const initialState = {
    bankData: [],
    bankDataLoading: false,
    bankDataError: null,
    bankDataSuccess: false,
    bankDataMessage: null,
};

const bankReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BANKS_REQUEST':
            return {
                ...state,
                bankDataLoading: true,
                bankDataError: null,
                bankDataSuccess: false,
                bankDataMessage: null,
            };
        case 'GET_BANKS_SUCCESS':
            return {
                ...state,
                bankData: action.payload,
                bankDataLoading: false,
                bankDataError: null,
                bankDataSuccess: true,
                bankDataMessage: action.payload.message,
            };
        case 'GET_BANKS_FAILURE':
            return {
                ...state,
                bankDataLoading: false,
                bankDataError: action.payload.error,
                bankDataSuccess: false,
                bankDataMessage: action.payload.message,
            };
        default:
            return state;
    }
};

export default bankReducer;