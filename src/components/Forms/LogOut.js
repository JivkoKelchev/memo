/**
 * Created by Jivko on 13.7.2018 г..
 */
import React from 'react';
import {Redirect} from 'react-router-dom';
import requester from '../../utils/requester';

const LogOut = () => {

    let logoutData = {
        authtoken: sessionStorage.getItem('authtoken')
    };

    requester.post('user', '_logout', 'kinvey', logoutData);

    sessionStorage.setItem('authtoken','');
    sessionStorage.setItem('username','');
    sessionStorage.setItem('role','');
    sessionStorage.setItem('id','');
    return <Redirect to="/"/>
};
export default LogOut;