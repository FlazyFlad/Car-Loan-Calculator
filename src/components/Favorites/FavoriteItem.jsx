import React, { useContext } from 'react';
import { ThemeContext } from '../../Context';

const FavoriteItem = ({ favoriteItems, handleRemoveItem }) => {

    const {theme} = useContext(ThemeContext)

    return (
        <div>
            {favoriteItems?.map((favorite) => (
                <div key={favorite.id} className={`cart-section cart-item ${theme ? 'dark-text' : 'dark-text'}`}>
                    <div className='cart-section cart-img'>
                        <img src={favorite.car_details?.picture} alt={favorite.car_details?.picture} />
                    </div>
                    <strong className='name'>{favorite.car_details?.name}</strong>
                    <span className="qty-change">
                        {/* <div className="cart-section">
                            <button className="btn-qty" onClick={() => handleQuantityChange(favorites.ProductID, favorites.Quantity - 1)}>
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <p className="qty">{favorites.Quantity}</p>
                            <button className="btn-qty" onClick={() => handleQuantityChange(favorites.ProductID, favorites.Quantity + 1)}>
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div> */}
                    </span>
                    <button onClick={() => handleRemoveItem(favorite.car_details?.id)}>
                        <i className='fas fa-trash'></i>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default FavoriteItem;