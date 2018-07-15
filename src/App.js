import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
//styles
import './App.css';
import './styles/board.css';
import './styles/card.css';
import './styles/background.css';
import './styles/home.css';
import './styles/forms.css';
import './styles/menu.css';
import './styles/score.css';
import './styles/notifications.css';
import './styles/loader.css';

import requester from './utils/requester';
import observer from './utils/observer';
import Background from './components/Background';
//pages
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import LogOut from './components/Forms/LogOut';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import Notification from './components/Notification';
import Loader from './components/PreLoader';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            images : [],
            loading : '',
            notifications : null,
        };

        observer.subscribe(observer.events.notifications, (notification)=>this.setState({notifications: notification}))
        observer.subscribe(observer.events.userIsLogged, (username)=>this.setState({username : username}))
    };

    componentDidMount(){
        this.getImages();
    }

    getImages=()=>{
        requester.get('appdata','cards','guest').then((r)=>{
            sessionStorage.setItem('images',JSON.stringify(r));
            this.setState({images: r},()=>(this.stopLoading()));
        }
        );
    };

    startLoading=()=>{
        this.setState({loading: ''})
    };

    stopLoading = () => {
        this.setState({ loading: 'none'})
    };

  render() {
    return (
        <div className="App">
            <Background/>
            <Notification notification = {this.state.notifications}/>
            <Loader loading={this.state.loading}/>
            {/*<h1 style={{color:'white',display:this.state.loading}}> Loading...</h1>*/}
            <Switch>
                <Route exact path="/" component = {Home}/>
                <Route  path="/login" component = {Home}/>
                <Route  path="/signup" component = {Home}/>
                <Route path="/logout" component={LogOut}/>
                <Route  path="/game" component={Game}/>
                <Route  path="/admin"
                        render={(props)=><Admin images={this.state.images}/>}
                />
                <Route path="/user" component={User} />
                <Route path='/score' component={ScoreBoard}/>
            </Switch>
        </div>


    );
  }
}

export default App;
