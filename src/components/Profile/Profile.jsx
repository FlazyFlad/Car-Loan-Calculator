import React, { useContext, useState, useEffect } from 'react';
import './Profile.css'; // Import your CSS file for styling if needed
import avatarUrl from './user-avatar.png';
import { ThemeContext } from '../../Context';

const Profile = () => {
    const { theme } = useContext(ThemeContext);

    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setMenuActive(true);
            } else {
                setMenuActive(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const user = {
        username: 'JohnDoe',
        email: 'johndoe@example.com',
        // avatarUrl: 'path/to/avatar-image.jpg' // URL of the avatar image
    };

    return (
        <>
            <div className={`container rounded pt-5 pb-5 ${theme ? 'dark-theme' : 'light-theme'}`}>
                <div class="row">
                    <div class="col-md-3 border-right">
                        <div class="d-flex flex-column align-items-center text-center p-3 py-5"> 
                        <img src={avatarUrl} alt="AvatarLogo"/> 
                        <span class="font-weight-bold"> {user.username} </span>
                        <span class="text-50"> {user.email} </span>
                        </div>
                    </div>
                    <div class="col-md-5 border-right">
                        <div class="p-3 py-5">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h4 class="text-right">Profile Settings</h4>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" placeholder="first name" value="" /></div>
                                <div class="col-md-6"><label class="labels">Surname</label><input type="text" class="form-control" value="" placeholder="surname" /></div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder="enter phone number" value="" /></div>
                                <div class="col-md-12"><label class="labels">Address Line 1</label><input type="text" class="form-control" placeholder="enter address line 1" value="" /></div>
                                <div class="col-md-12"><label class="labels">Address Line 2</label><input type="text" class="form-control" placeholder="enter address line 2" value="" /></div>
                                <div class="col-md-12"><label class="labels">Postcode</label><input type="text" class="form-control" placeholder="enter address line 2" value="" /></div>
                                <div class="col-md-12"><label class="labels">State</label><input type="text" class="form-control" placeholder="enter address line 2" value="" /></div>
                                <div class="col-md-12"><label class="labels">Area</label><input type="text" class="form-control" placeholder="enter address line 2" value="" /></div>
                                <div class="col-md-12"><label class="labels">Email ID</label><input type="text" class="form-control" placeholder="enter email id" value="" /></div>
                                <div class="col-md-12"><label class="labels">Education</label><input type="text" class="form-control" placeholder="education" value="" /></div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-6"><label class="labels">Country</label><input type="text" class="form-control" placeholder="country" value="" /></div>
                                <div class="col-md-6"><label class="labels">State/Region</label><input type="text" class="form-control" value="" placeholder="state" /></div>
                            </div>
                            {!menuActive && (
                            <div class="mt-5 text-center"><button class="ctaa-button" type="button">Save Profile</button></div>
                            )}
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="p-3 py-5">
                            <div class="d-flex justify-content-between align-items-center experience"><span>Card Information</span></div><br />
                            <div class="col-md-12"><label class="labels">Experience in Designing</label><input type="text" class="form-control" placeholder="experience" value="" /></div> <br />
                            <div class="col-md-12"><label class="labels">Additional Details</label><input type="text" class="form-control" placeholder="additional details" value="" /></div>
                        </div>
                        {menuActive && (
                            <div class="mt-5 text-center"><button class="ctaa-button" type="button">Save Profile</button></div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
