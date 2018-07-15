/**
 * Created by Jivko on 13.7.2018 г..
 */
import React from 'react';
import {withRouter} from 'react-router-dom';

import Board from './Board';
import Timer from './Timer';
import Navigation from '../Menu/Navigation';


import requester from '../../utils/requester';

class Game extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            pairsLeft : 6,
            time : 0
        };
    }

    setPairsLeft =(pairs)=>{
        this.setState(
            {pairsLeft: pairs},
            ()=>{
                if(pairs === 0){
                    this.timerStop();
                }
            })
    };


    //time functions
    timerInterval = null;

    getTime = () =>{
        let reminding;
        let minutes;
        let seconds;
        let milliseconds;

        minutes = Math.floor(this.state.time/6000);
        reminding = this.state.time%6000;
        seconds = Math.floor(reminding/100);
        milliseconds = this.state.time%100;
        if(milliseconds === 0){
            milliseconds = '00'
        }
        return minutes + ' : ' + seconds + '.' + milliseconds
    };

    addTime = () => {
        let time = this.state.time;
        this.setState({time : time + 1});
    };

    timerStart = () => {
        if (!this.timerInterval){
            this.timerInterval = setInterval(() => this.addTime() , 10)
        }
    };

    timerStop = () => {
        clearInterval(this.timerInterval);
        sessionStorage.setItem('lastScore', this.state.time)
        if(sessionStorage.getItem('authtoken')){
            requester.post('appdata','scores','kinvey',{
                username : sessionStorage.getItem('username'),
                time : this.formatTime(this.state.time)
            }, this.redirectToScore.bind(this))
        }
    };

    redirectToScore = () => {this.props.history.push("/score")}


    formatTime = (num) => {
        let s = "00000000" + num;
        return s.substr(s.length-8);
    };

    render = () => {
        return(
            <div className="game">
                <Navigation/>
                <Board startGameFn={this.timerStart} endGameFn={this.timerStop} setPairsLeft={this.setPairsLeft}/>
                <Timer time={this.getTime()}/>
            </div>
        )
    }
}

export default withRouter(Game)