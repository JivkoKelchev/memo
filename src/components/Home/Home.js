/**
 * Created by Jivko on 12.7.2018 г..
 */
import React from 'react';
import logo from '../../Images/game_logo.png';
import MainMenu from'../Menu/MainMenu';
import Login from '../Forms/Login';
import SignUp from '../Forms/SignUp';
import {Route,Switch} from 'react-router-dom';


export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            authtoken :  sessionStorage.getItem('authtoken'),
            id : sessionStorage.getItem('id'),
            username : sessionStorage.getItem('username'),
            role : sessionStorage.getItem('role'),
            loading : 'none'
        };
    }

    setUser = (userObj) => {
        this.setState({
            authtoken: userObj.authtoken,
            id: userObj.id,
            username: userObj.username,
            admin: userObj.admin
        }
        );
        sessionStorage.setItem('authtoken', userObj.authtoken);
        sessionStorage.setItem('username', userObj.username);
        sessionStorage.setItem('id', userObj.id);
        sessionStorage.setItem('role', userObj.role);
        this.stopLoading();
    };



    greetings = () => {
        if (sessionStorage.getItem('authtoken')){
            return 'Hey '+this.state.username +', lets pley Rick and Morty Memo game!'
        }
        return ''
    };

    startLoading=()=>{
        this.setState({loading: ''})
    };

    stopLoading = () => {
        this.setState({ loading: 'none'})
    };


    render = ()=>{
        return(
            <div>
                <img className="logo" src={logo} alt=""/>
                <p className = "greetings">{this.greetings()}</p>
                <MainMenu user={this.state}/>
                <h3 style={{display:this.state.loading}}>Loading...</h3>
                <Switch>
                    <Route
                        path='/login'
                        render={ (props) => <Login setUser={this.setUser}
                                                   startLoading={this.startLoading}
                                                   stopLoadong={this.stopLoading} />}
                    />
                    <Route path='/signup'
                           //component={SignUp}
                           render={ (props) => <SignUp setUser={this.setUser}
                                                      startLoading={this.startLoading}
                                                      stopLoadong={this.stopLoading} />}/>
                </Switch>
            </div>
        )
    }
}