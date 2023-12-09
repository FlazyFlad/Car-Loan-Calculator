// authReducer.js
const initialState = {
    access_token: null,
    refresh_token: null,
    isLoggedIn: false,
    loading: false,
    error: null,
    user: null,
    registering: false,
    registerError: null,
    registrationSuccess: false,

    updateProfileError: null,
    updateProfileSuccess: false,
    updateProfileLoading: false,

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        case 'GET_USER_DETAILS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'GET_USER_DETAILS_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload.user,
            };
        case 'GET_USER_DETAILS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        case 'CHECK_AUTH_STATUS':
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
            };
        case 'SET_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
            };
        case 'REGISTER_REQUEST':
            return {
                ...state,
                registering: true,
                registerError: null,
                registrationSuccess: false,
            };

        case 'REGISTER_SUCCESS':
            return {
                ...state,
                registering: false,
                registerError: null,
                registrationSuccess: true,
            };

        case 'REGISTER_FAILURE':
            return {
                ...state,
                registering: false,
                registerError: action.payload.error,
                registrationSuccess: false,
            };
        case 'UPDATE_USER_REQUEST':
            return {
                ...state,
                updateProfileLoading: true,
                updateProfileError: null,
                updateProfileSuccess: false,
            };
        case 'UPDATE_USER_SUCCESS':
            return {
                ...state,
                updateProfileLoading: false,
                updateProfileError: null,
                updateProfileSuccess: true,
                user: action.payload.user,
            };
            case 'UPDATE_USER_FAILURE':
                return {
                    ...state,
                    updateProfileLoading: false,
                    updateProfileError: action.payload.error,
                    updateProfileSuccess: false,
                };
            default:
                return state;
    }
};

export default authReducer;
