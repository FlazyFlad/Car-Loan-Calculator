import axios from 'axios';

const baseUrl = "https://cale.pythonanywhere.com";

const loginRequest = () => ({ type: 'LOGIN_REQUEST' });
const loginSuccess = (access_token, refresh_token) => ({
    type: 'LOGIN_SUCCESS',
    payload: {
        access_token,
        refresh_token,
    },
});
const loginFailure = (error) => ({ type: 'LOGIN_FAILURE', payload: { error } });

const getUserDetailsRequest = () => ({ type: 'GET_USER_DETAILS_REQUEST' });
const getUserDetailsSuccess = (user) => ({ type: 'GET_USER_DETAILS_SUCCESS', payload: { user } });
const getUserDetailsFailure = (error) => ({ type: 'GET_USER_DETAILS_FAILURE', payload: { error } });


const registerRequest = () => {
    return {
        type: 'REGISTER_REQUEST',
    };
};

const registerSuccess = (userData) => {
    return {
        type: 'REGISTER_SUCCESS',
        payload: { userData },
    };
};

const registerFailure = (error) => {
    return {
        type: 'REGISTER_FAILURE',
        payload: { error },
    };
};



// Action creators
const updateUserRequest = () => {
    return {
        type: 'UPDATE_USER_REQUEST',
    };
};

const updateUserSuccess = (userData) => {
    return {
        type: 'UPDATE_USER_SUCCESS',
        payload: userData,
    };
};

const updateUserFailure = (error) => {
    return {
        type: 'UPDATE_USER_FAILURE',
        payload: { error },
    };
};

export const login = (username, password) => {
    return async (dispatch) => {
        dispatch(loginRequest());

        try {
            const response = await axios.post(`${baseUrl}/api/v1/token/`, { username, password });

            const accessToken = response.data.access;

            const isLoggedIn = !!response.data.access;

            dispatch(loginSuccess(accessToken));

            dispatch({
                type: 'SET_IS_LOGGED_IN',
                payload: { isLoggedIn },
            });

            dispatch(getUserDetails(accessToken));
        } catch (error) {
            if (error.response) {

                console.error('Error response:', error.response.data)
            }
            dispatch(loginFailure(error.response.data));
            const isLoggedIn = false

            dispatch({
                type: 'SET_IS_LOGGED_IN',
                payload: { isLoggedIn: false },
            });
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_IS_LOGGED_IN',
            payload: { isLoggedIn: false },
        });
    }
};

export const getUserDetails = (token) => {
    return async (dispatch) => {
        dispatch(getUserDetailsRequest());

        try {
            const response = await axios.get(`${baseUrl}/get-details/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch(getUserDetailsSuccess(response.data));
        } catch (error) {
            dispatch(getUserDetailsFailure(error.message));
        }
    };
};

export const register = (userData) => {
    return async (dispatch) => {
        dispatch(registerRequest());

        try {
            const response = await axios.post(`${baseUrl}/api/v1/register/`, userData);

            dispatch(registerSuccess(response.data));

        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data, typeof error.response.data)
            }
            dispatch(registerFailure(error.message));
        }
    };
};


export const updateUser = (userData, accessToken) => {
    return async (dispatch, getState) => {
        dispatch(updateUserRequest());

        try {
            const response = await axios.put(
                `${baseUrl}/api/v1/user/update/`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            
            dispatch(getUserDetails(getState().auth.access_token));
            dispatch(updateUserSuccess(response.data));
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data, typeof error.response.data);
            }
            dispatch(updateUserFailure(error.message));
        }
    };
};
