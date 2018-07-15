/**
 * Created by Jivko on 15.7.2018 г..
 */
import React from 'react'
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import {withRouter} from 'react-router-dom';

class User extends React.Component{
    constructor(props){
        super(props)

        if(!sessionStorage.getItem('authtoken')){
            this.props.history.push('/')
        }
    }

    render(){
        return(
            <ScoreBoard user={sessionStorage.getItem('id')}/>
        )
    }
}


export default withRouter(User);