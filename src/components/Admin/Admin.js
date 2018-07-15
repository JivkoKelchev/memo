/**
 * Created by Jivko on 13.7.2018 г..
 */
import React from 'react';

// import {validationSignUp} from '../../utils/formValidator';
 import requester from '../../utils/requester';
 import {withRouter} from 'react-router-dom';
import Navigation from '../Menu/Navigation';
import ImageForm from '../Forms/ImageForm';
import Notification from "../Notification";

 class Admin extends React.Component{
    constructor(props){
        super(props);

        this.state={
            images: this.props.images
        }
    }
    submit=(e)=>{
        e.preventDefault();

    };

    validate = () => true;

    clearScores=() => {
        requester.remove('appdata','scores/?query={"time":{"$gte": 0}}','kinvey',this.redirectToScores)
    };

    redirectToScores=()=>{
        this.props.history.push('/score')
    }

    render = () => {
        return(
            <div>
                <Navigation/>
                <ImageForm validationFn={this.validate} submitFn={this.submit} images={this.state.images}>
                </ImageForm>
                <button onClick={this.clearScores}>Clear scores</button>
            </div>
        )
    }
}

export default withRouter(Admin);