import React, { useContext, useState, useEffect } from 'react';
import './Profile.css'; // Import your CSS file for styling if needed
import avatarUrl from './user-avatar.png';
import { ThemeContext } from '../../Context';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { updateUser } from '../../actions/authActions';

const Profile = () => {
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const userDetails = useSelector(state => state.auth.user);
    const accessToken = useSelector(state => state.auth.access_token);
    const user = useSelector(state => state.auth.user);
    const err = useSelector(state => state.auth.error);

    const [menuActive, setMenuActive] = useState(false);

    const [formData, setFormData] = useState({
        data_birth: '',
        username: '',
        first_name: '',
        iin: '',
        last_name: '',
        email: '',
        picture: null,
    });

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setFormData({
            ...formData,
            data_birth: selectedDate,
        });
    };

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            picture: e.target.files[0],
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('data_birth', formData.data_birth);
        formData.append('username', formData.username);
        formData.append('first_name', formData.first_name);
        formData.append('last_name', formData.last_name);
        formData.append('email', formData.email);
    
        if (formData.picture) {
            formData.append('picture', formData.picture);
        }
    
        dispatch(updateUser(formData, accessToken));
    };
    

    useEffect(() => {
        setFormData({
            data_birth: userDetails.data_birth || '',
            username: userDetails.username || '',
            first_name: userDetails.first_name || '',
            iin: userDetails.iin || '',
            last_name: userDetails.last_name || '',
            email: userDetails.email || '',
            picture: null,
        });
    }, [userDetails]);



    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    return (
        !userDetails ? (
            <>
                <div className="loading-spinner"></div>
            </>
        ) : (
            <>
                <div className={`container rounded pt-5 pb-5 ${theme ? 'dark-theme' : 'light-theme'}`}>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="row">
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img src={`https://cale.pythonanywhere.com/${userDetails.picture}`} alt="AvatarLogo" />
                                    <span className="font-weight-bold" value={userDetails.username}> </span>
                                    <span className="text-50" value={userDetails.email}> </span>
                                    <input type="file" name="picture" onChange={handleFileChange} />
                                </div>
                            </div>
                            <div className="col-md-5 border-right">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Profile Settings</h4>
                                    </div>
                                    <div className="row mt-2">
                                        <div
                                            className="col-md-6"><label
                                                className="labels">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="first_name"
                                                name="first_name"
                                                value={formData.first_name}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div
                                            className="col-md-6"><label
                                                className="labels">Last
                                                Name</label><input
                                                type="text"
                                                className="form-control"
                                                placeholder="last_name"
                                                name="last_name"
                                                value={formData.last_name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div
                                            className="col-md-12"><label
                                                className="labels">Username
                                            </label><input
                                                type="text"
                                                className="form-control"
                                                placeholder="username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div
                                            className="col-md-12"><label
                                                className="labels">Date of Birth
                                            </label>
                                            <input
                                                type="date"
                                                name="date_birth"
                                                className="form-control"
                                                value={formData.data_birth}
                                                onChange={handleDateChange}
                                                required
                                            />
                                        </div>
                                        <div
                                            className="col-md-12"><label
                                                className="labels">Email
                                            </label><input
                                                type="text"
                                                className="form-control"
                                                placeholder="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center experience"><span>Unchangeable Information</span></div><br />
                                    <div className="col-md-12"><label className="labels">Individual identification number</label>
                                        <p>{formData.iin}</p>
                                    </div> <br />
                                    {/* <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" /></div> */}
                                </div>
                            </div>

                            <div className="button-section"><button className="ctaa-button" type="submit">Save Profile</button></div>
                        </div>
                    </form>
                </div>
            </>
        )
    );
}

export default Profile;
