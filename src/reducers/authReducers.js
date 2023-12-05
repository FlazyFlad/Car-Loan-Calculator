const initialState = {
    isLoginLoading: false,
    isLoginSuccess: false,
    isLoginFailure: false,
    loginSuccessMessage: '',
    loginErrorMessage: '',
};


const authReducer = (state = initialState, action) => {
    console.log("Reducer triggered with action: ", action.type);

    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isLoginLoading: true,
                isLoginSuccess: false,
                isLoginFailure: false,
            };
        case 'LOGIN_FULFILLED':
            return {
                ...state,
                isLoginLoading: false,
                isLoginSuccess: true,
                isLoginFailure: false,
                loginSuccessMessage: action.payload.message,
            };
        case 'LOGIN_REJECTED':
            return {
                ...state,
                isLoginLoading: false,
                isLoginSuccess: false,
                isLoginFailure: true,
                loginErrorMessage: action.payload.message,
            };
        case 'LOGOUT_REQUEST':
            return {
                ...state,
                isLogoutLoading: true,
            };
        case 'LOGOUT_FULFILLED':
            return {
                ...state,
                isLogoutLoading: false,
                isLogoutSuccess: true,
                isLogoutFailure: false,
                isLoginSuccess: false,
                logoutSuccessMessage: action.payload.message,
            };
        case 'LOGOUT_REJECTED':
            return {
                ...state,
                isLogoutLoading: false,
                isLogoutSuccess: false,
                isLogoutFailure: true,
                logoutErrorMessage: action.payload.message,
            };
        default:
            return state;
    }
};

export default authReducer;