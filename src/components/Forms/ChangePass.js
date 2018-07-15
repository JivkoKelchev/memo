/**
 * Created by Jivko on 15.7.2018 г..
 */
import React from 'react';
import BoundForm from './BoundForm';
import {validationChangePass} from '../../utils/formValidator';
import requester from '../../utils/requester';
import observer from '../../utils/observer';
import {withRouter} from 'react-router-dom';

class ChangePassUser extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            password : '',
            confirm : ''
        }
    }

    submit = (formData) => {
        this.props.startLoading();
        let errors = validationSignUp(formData);
        if (!errors.uername && !errors.password && !errors.confirm){
            requester.post('user', sessionStorage.getItem('id'), 'basic', {username : formData.username, password : formData.password, role: 'user'})
                .then(response => {
                    this.props.setUser({
                        authtoken : response._kmd.authtoken,
                        id : response._id,
                        username : formData.username,
                        //admin : false
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
        this.setState(validationChangePass(formData)) ;
    };

    render = () =>{
        if(!sessionStorage.getItem('authtoken')){
            return''
        }else{
            return(
                <div className="form-container">
                    <BoundForm validationFn={this.validate} submitFn={this.submit}>
                        <label   htmlFor="">Password</label>
                        <input
                            className="form-control form-control-sm"
                            type="password"
                            name="password"
                        />
                        <small className="form-text text-danger">{this.state.password}</small>
                        <label   htmlFor="">Confirm password</label>
                        <input
                            className="form-control form-control-sm"
                            type="password"
                            name="confirm"
                        />
                        <small className="form-text text-danger">{this.state.confirm}</small>
                        <div className="form-buttons">
                            <input type="submit"  className="btn btn-dark btn-sm" value="Sign Up"/>
                        </div>
                    </BoundForm>
                </div>
            )
        }
    }
}

export default withRouter(EditUser);