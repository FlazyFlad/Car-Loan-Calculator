import React, { useContext, useState, useEffect } from 'react';
import './Profile.css'; // Import your CSS file for styling if needed
import avatarUrl from './user-avatar.png';
import { ThemeContext } from '../../Context';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserDetails, updateUser } from '../../actions/authActions';

const Profile = () => {
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const isLoggedIn = useSelector(state => state.auth?.isLoggedIn);
    const userDetails = useSelector(state => state.auth?.user);
    const accessToken = useSelector(state => state.auth?.access_token);
    const user = useSelector(state => state.auth?.user);
    const updateProfileError = useSelector(state => state.auth?.updateProfileError);

    const [menuActive, setMenuActive] = useState(false);

    const [userData, setUserData] = useState({
        username: userDetails?.username || '',
        first_name: userDetails?.first_name || '',
        last_name: userDetails?.last_name || '',
    });

    useEffect(() => {
        dispatch(getUserDetails())
            .then(() => {
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [dispatch]);


    const handleInputChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (e) => {
        setUserData({
            ...userData,
            picture: e.target.files[0],
        });
    };

    const handleSubmit = (event) => {
        const formData = new FormData();

        formData.append('username', userData.username);
        formData.append('first_name', userData.first_name);
        formData.append('last_name', userData.last_name);
      
        if (userData.picture instanceof File) {
          formData.append('picture', userData.picture);
        }

        event.preventDefault();
        dispatch(updateUser(formData, accessToken));
    };



    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    return (
        !userDetails ? (
            <>
                <div className="profile-body">
                    <div className="loading-spinner"></div>
                </div>
            </>
        ) : (
            <>
                <div className="profile-body">
                    <div className={`container rounded pt-5 pb-5 ${theme ? 'dark-theme' : 'light-theme'}`} style={{ marginLeft: '9%' }}>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-1/4 border-r">
                                    <div className="flex flex-col items-center text-center p-3 py-5">
                                        <img src={`https://cale.pythonanywhere.com/${userDetails.picture}`} alt="AvatarLogo" />
                                        <span className="font-bold">{userDetails.username}</span>
                                        <span className="text-gray-500">{userDetails.email}</span>



                                        <div className="flex items-center justify-center bg-grey-lighter">
                                            <input type='file' onChange={handleFileChange} name="picture"
                                                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input"
                                            />
                                        </div>




                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 border-r">
                                    <div className="p-3 py-5">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="text-right">Profile Settings</h4>
                                        </div>
                                        <div className="flex flex-wrap mt-2">
                                            <div className="w-full md:w-1/2">
                                                <label className="labels">Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="first_name"
                                                    name="first_name"
                                                    value={userData.first_name}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <label className="labels">Last Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="last_name"
                                                    name="last_name"
                                                    value={userData.last_name}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap mt-3">
                                            <div className="w-full">
                                                <label className="labels">Username</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="username"
                                                    name="username"
                                                    value={userData.username}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="button-section flex items-end justify-center">
                                        <button className="ctaa-button" type="submit">
                                            Save Profile
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/4">
                                    <div className="p-3 py-5">
                                        <div className="flex justify-between items-center experience">
                                            <span>Other Information</span>
                                        </div>
                                        <br />
                                        <div className="w-full">
                                            <label className="labels">Individual identification number</label>
                                            <p>{userData.iin}</p>
                                        </div>
                                        <br />
                                    </div>
                                </div>

                                {updateProfileError && <p className='text-red-500 text-sm'>{updateProfileError}</p>}

                            </div>
                        </form>
                    </div >
                </div >

            </>
        )
    );
}

export default Profile;
