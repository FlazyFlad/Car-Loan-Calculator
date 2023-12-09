import axios from 'axios';

const getCarsRequest = () => {
    return {
        type: 'GET_CARS_REQUEST'
    };
};

const getCarsSuccess = (payload) => {
    return {
        type: 'GET_CARS_SUCCESS',
        payload
    };
};

const getCarsFailure = (error) => {
    return {
        type: 'GET_CARS_FAILURE',
        payload: { message: error.message }
    };
};

//const baseUrl = process.env.REACT_APP_API_URL;

const baseUrl = 'https://cale.pythonanywhere.com/api/v1';

console.log("baseUrl:", baseUrl);

export const getCars = () => {
    return async (dispatch) => {
        dispatch(getCarsRequest());

        try {
            const response = await axios.get(`${baseUrl}/car`);
            dispatch(getCarsSuccess(response.data));
            console.log('Success:', JSON.stringify(response.data));
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data)
            }
            const errorMessage = error.response && error.response.data && error.response.data.message
            dispatch(getCarsFailure({message: errorMessage}));
        }
    };
}
