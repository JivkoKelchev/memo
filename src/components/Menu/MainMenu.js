/**
 * Created by Jivko on 13.7.2018 г..
 */
import React from 'react';

import MenuItem from './MenuItem';

export default class MainMenu extends  React.Component{

    render = () => {
        //console.log(sessionStorage.getItem('admin'))
        if (sessionStorage.getItem('authtoken') && sessionStorage.getItem('role')==='admin'){
            return(
                <div className="menu">
                    <MenuItem path="/game" content='fa fa-play'/>
                    <MenuItem path="/logout" content='fa fa-sign-out'/>
                    <MenuItem path="/user" content='fa fa-user'/>
                    <MenuItem path="/score" content='fa fa-star'/>
                    <MenuItem path="/admin" content='fa fa-cog'/>
                </div>
            )
        }else if (sessionStorage.getItem('authtoken') && sessionStorage.getItem('role')!=='admin'){
            return(
            <div className="menu">
                <MenuItem path="/game" content='fa fa-play'/>
                <MenuItem path="/logout" content='fa fa-sign-out'/>
                <MenuItem path="/user" content='fa fa-user'/>
                <MenuItem path="/score" content='fa fa-star'/>
            </div>
        )
        }
        return(
            <div className="menu">
                <MenuItem path="/game" content='fa fa-play'/>
                <MenuItem path="/login" content='fa fa-sign-in'/>
                <MenuItem path="/signup" content='fa fa-user-plus'/>
                <MenuItem path="/score" content='fa fa-star'/>
            </div>
            )
    }
}