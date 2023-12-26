import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../Context';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteItem from './FavoriteItem';
import { clearFavorites, toggleFavoriteNav } from '../../actions/favoriteActions';
import './Favorites.css';

const FavoriteComponent = ({ favoriteItems, handleRemoveItem }) => {
    const isFavoriteNavOpen = useSelector((state) => state.favorite.isFavoriteNavOpen);
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);

    const openingFavorite = {
        right: isFavoriteNavOpen ? '0px' : '-100%',
        visibility: isFavoriteNavOpen ? '' : 'hidden',
    };

    const handleClearFavorites = () => {
        dispatch(clearFavorites());
    };

    return (
        <>
            <div className="cart">
                <div className={`cart-section side-nav ${theme ? 'dark-favorite-theme' : 'light-theme'} `} style={openingFavorite}>
                    <button className="cart-section" onClick={() => dispatch(toggleFavoriteNav())}>
                        <i className={`fas fa-times ${theme ? 'dark-text' : 'dark-text'}`}></i>
                    </button>
                    <h2 className={`cart-all ${theme ? 'dark-text' : 'dark-text'}`}>Favorites</h2>
                    {favoriteItems?.length > 0 ? (
                        <div className="cart-section cart-items">
                            <FavoriteItem
                                favoriteItems={favoriteItems}
                                // handleQuantityChange={handleQuantityChange}
                                handleRemoveItem={handleRemoveItem}
                            />
                        </div>
                    ) : (
                        <span class="empty-cart">Looks Like You Haven't Added Any Product In The Favorite Section</span>
                    )}
                    <div className="cart-section cart-section final">
                        <div className="cart-section action">
                            <button onClick={() => dispatch(toggleFavoriteNav())} className={`btn buy ${theme ? 'dark-text' : 'dark-text'}`}>
                                Confirm <i class="fa fa-check-circle-o" style={{ color: "#177245" }}></i>
                            </button>
                            <button onClick={() => handleClearFavorites()} className={`btn clear ${theme ? 'dark-text' : 'dark-text'}`}>
                                Clear Favorite <i className="fas fa-trash" style={{ color: "#bb342f" }}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FavoriteComponent;
