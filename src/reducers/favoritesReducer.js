const initialState = {
    isLoading: false,
    favoriteItems: [],
    isFavoriteNavOpen: false,
    error: null,
};

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_FAVORITES_REQUEST':
        case 'ADD_TO_FAVORITES_REQUEST':
        case 'REMOVE_FROM_FAVORITES_REQUEST':
        case 'CLEAR_FAVORITES_REQUEST':
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case 'TOGGLE_FAVORITE_NAV':
            return {
                ...state,
                isFavoriteNavOpen: !state.isFavoriteNavOpen,
            };

        case 'FETCH_FAVORITES_SUCCESS':
            return {
                ...state,
                isLoading: false,
                favoriteItems: action.payload,
                error: null,
            };

        case 'ADD_TO_FAVORITES_SUCCESS':
        case 'REMOVE_FROM_FAVORITES_SUCCESS':
        case 'CLEAR_FAVORITES_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: null,
            };

        case 'FETCH_FAVORITES_FAILURE':
        case 'ADD_TO_FAVORITES_FAILURE':
        case 'REMOVE_FROM_FAVORITES_FAILURE':
        case 'CLEAR_FAVORITES_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default favoritesReducer;
