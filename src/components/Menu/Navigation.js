/**
 * Created by Jivko on 14.7.2018 г..
 */
import React from 'react';
import MenuItem from './MenuItem';


export default class Navigation extends React.Component{

    render=()=>{
        return(
            <div className="navigation">
                <div className="left">
                    <MenuItem path="/" content='fa fa-home'/>
                    <MenuItem path="/game" content='fa fa-play'/>
                    <MenuItem path="/score" content='fa fa-star'/>
                </div>
                <div className="right">
                    { sessionStorage.getItem('authtoken') ? <MenuItem path="/logout" content='fa fa-sign-out'/> : ''}
                </div>
            </div>

        )
    }

}