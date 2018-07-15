/**
 * Created by Jivko on 12.7.2018 г..
 */
import React from 'react';
import {Link} from 'react-router-dom';

const MenuItem = (props) => {
    return (
        <Link className="menu-item" to={props.path}   >
            <div className="circle">
                <i className={props.content}></i>
            </div>
        </Link>
    )
};

export default MenuItem;
