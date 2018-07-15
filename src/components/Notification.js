/**
 * Created by Jivko on 8.7.2018 г..
 */
import React from 'react';


export default class Notification extends React.Component {
    render = () => {
            if (this.props.notification){
                return <div id={this.props.notification.type}  className='notification'>{this.props.notification.msg}</div>
            }else {
                return <div className='notification'></div>
            }
    }
}