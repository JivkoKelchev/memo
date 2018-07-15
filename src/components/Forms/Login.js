/**
 * Created by Jivko on 13.7.2018 г..
 */
import React from 'react';
import BoundForm from './BoundForm';
import {validationLogin} from '../../utils/formValidator';
import requester from '../../utils/requester';
import observer from '../../utils/observer';
import {withRouter} from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username : '',
            password : ''
        }
    }

    login = (formData) => {
        this.props.startLoading();
        let errors = validationLogin(formData);
        if (!errors.uername && !errors.password){

             requester.post('user', 'login', 'basic', {username : formData.username, password : formData.password})
                .then(response => {
                    this.props.setUser({
                        authtoken : response._kmd.authtoken,
                        id : response._id,
                        username : formData.username,
                        role:response.role
                    });
                    this.props.history.push("/")
                })
                .catch(response => {
                    this.props.setUser({
                        authtoken : '',
                        id : '',
                        username : '',
                        role:''
                    });
                    observer.trigger(observer.events.notifications, {type : 'errorBox', msg : response.responseJSON.description})
                });

        }else{
            this.validate(formData);
        }

    };

    validate = (formData) => {
        this.setState(validationLogin(formData)) ;
    };

    render = () =>{
        return(
            <div className="form-container">
                <BoundForm validationFn={this.validate} submitFn={this.login}>
                    <label htmlFor="">Username</label>
                    <input
                        className="form-control form-control-sm"
                        type="text"
                        name="username"
                    />
                    <small className="form-text text-danger ">{this.state.username}</small>
                    <label   htmlFor="">Password</label>
                    <input
                        className="form-control form-control-sm"
                        type="password"
                        name="password"
                    />
                    <small className="form-text text-danger">{this.state.password}</small>
                    <div className="form-buttons">
                        <input type="submit"  className="btn btn-dark btn-sm" value="Log In"/>
                    </div>
                </BoundForm>
            </div>

        )

    }
}

export default withRouter(Login);