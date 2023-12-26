import axios from 'axios';

const baseUrl = "https://cale.pythonanywhere.com";

const fetchFavoritesRequest = () => ({ type: 'FETCH_FAVORITES_REQUEST' });
const fetchFavoritesSuccess = (favorites) => ({ type: 'FETCH_FAVORITES_SUCCESS', payload: favorites });
const fetchFavoritesFailure = (error) => ({ type: 'FETCH_FAVORITES_FAILURE', payload: error });

const addToFavoritesRequest = () => ({ type: 'ADD_TO_FAVORITES_REQUEST' });
const addToFavoritesSuccess = () => ({ type: 'ADD_TO_FAVORITES_SUCCESS' });
const addToFavoritesFailure = (error) => ({ type: 'ADD_TO_FAVORITES_FAILURE', payload: error });

const removeFromFavoritesRequest = () => ({ type: 'REMOVE_FROM_FAVORITES_REQUEST' });
const removeFromFavoritesSuccess = () => ({ type: 'REMOVE_FROM_FAVORITES_SUCCESS' });
const removeFromFavoritesFailure = (error) => ({ type: 'REMOVE_FROM_FAVORITES_FAILURE', payload: error });

const clearFavoritesRequest = () => ({ type: 'CLEAR_FAVORITES_REQUEST' });
const clearFavoritesSuccess = () => ({ type: 'CLEAR_FAVORITES_SUCCESS' });
const clearFavoritesFailure = (error) => ({ type: 'CLEAR_FAVORITES_FAILURE', payload: error });

export const toggleFavoriteNav = () => ({
    type: 'TOGGLE_FAVORITE_NAV',
});


export const fetchFavorites = (token) => async (dispatch, getState) => {
    dispatch(fetchFavoritesRequest());
    try {
        const response = await axios.get(`${baseUrl}/api/v1/favorites/user_favorites/`, {
            headers: { Authorization: `Bearer ${getState().auth.access_token}` },
        });
        dispatch(fetchFavoritesSuccess(response.data));
    } catch (error) {
        dispatch(fetchFavoritesFailure(error.message));
    }
};

export const addToFavorites = (car) => async (dispatch, getState) => {
    dispatch(addToFavoritesRequest());
    try {
        console.log(getState().auth.access_token, car)
        await axios.post(`${baseUrl}/api/v1/favorites/add_to_favorites/`, { car }, {
            headers: { Authorization: `Bearer ${getState().auth.access_token}` },
        });
        dispatch(fetchFavorites());
        dispatch(addToFavoritesSuccess());
    } catch (error) {
        dispatch(addToFavoritesFailure(error.message));
    }
};

export const removeFromFavorites = (car) => async (dispatch, getState) => {
    dispatch(removeFromFavoritesRequest());
    try {
        await axios.post(`${baseUrl}/api/v1/favorites/remove_from_favorites/`, { car }, {
            headers: { Authorization: `Bearer ${getState().auth.access_token}` },
        });
        dispatch(fetchFavorites());
        dispatch(removeFromFavoritesSuccess());
    } catch (error) {
        dispatch(removeFromFavoritesFailure(error.message));
    }
};

export const clearFavorites = () => async (dispatch, getState) => {
    dispatch(clearFavoritesRequest());
    try {
        await axios.post(`${baseUrl}/api/v1/favorites/clear_favorites/`, null, {
            headers: { Authorization: `Bearer ${getState().auth.access_token}` },
        });
        dispatch(fetchFavorites());
        dispatch(clearFavoritesSuccess());
    } catch (error) {
        dispatch(clearFavoritesFailure(error.message));
    }
};
