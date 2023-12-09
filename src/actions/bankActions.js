import axios from 'axios';

export const getBanksRequest = () => {
    return {
        type: 'GET_BANKS_REQUEST'
    };
};

export const getBanksSuccess = (banks) => {
    return {
        type: 'GET_BANKS_SUCCESS',
        payload: banks
    };
};

export const getBanksFailure = (error) => {
    return {
        type: 'GET_BANKS_FAILURE',
        payload: { message: error.message }
    };
};

export const getBanks = () => {
    return async (dispatch) => {
        dispatch(getBanksRequest());

        try {
            const response = await axios.get('https://cale.pythonanywhere.com/api/v1/bank');
            dispatch(getBanksSuccess(response.data));
            //console.log('Banks from action:', JSON.stringify(response.data));
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data)
            }
            const errorMessage = error.response && error.response.data && error.response.data.message
            dispatch(getBanksFailure({message: errorMessage}));
        }
    };
}