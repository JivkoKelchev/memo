/**
 * Created by Jivko on 14.7.2018 г..
 */
import React from 'react';
import Navigation from '../Menu/Navigation';
import AddComment from '../Forms/AddComment';
import requester from '../../utils/requester';

export default class ScoreBoard extends React.Component{
    constructor(props){
        super(props);

        this.state={
            firstTimes:[],
            currentTime:0,
            comments:[],
            loading: ''
        }

    }

    initialiseState=()=>{
        if(this.props.user){
            requester.get('appdata',`scores?query={"username":"${sessionStorage.getItem('username')}"}&sort=time`,'guest').then(
                (r)=>{
                    this.setState({
                        currentTime : this.props.time,
                        firstTimes: r
                    },()=>(console.log(this.state.firstTimes)))
                }
            );
        }else{
            requester.get('appdata','scores?sort=time&limit=5','guest').then(
                (r)=>{
                    this.setState({
                        currentTime : this.props.time,
                        firstTimes: r
                    },()=>(console.log(this.state.firstTimes)))
                }
            );
        }


        requester.get('appdata','coments','guest').then(
            (r)=>{
                this.setState({
                    comments: r
                },this.scrollBottom)
            }
        );

        this.stopLoading();
    };

    componentDidMount(){
        this.initialiseState();
    }

    stopLoading=()=>{
        this.setState({loading : 'none'})
    };

    startLoading=()=>{
        this.setState({loading : ''})
    };

    getTime = (timeString) =>{
        let time = Number(timeString);
        let reminding;
        let minutes;
        let seconds;
        let milliseconds;

        minutes = Math.floor(time/6000);
        reminding = time%6000;
        seconds = Math.floor(reminding/100);
        milliseconds = time%100;
        if(milliseconds === 0){
            milliseconds = '00'
        }
        return minutes + ' : ' + seconds + '.' + milliseconds
    };

    renderFirstScores=()=>{
        let times = this.state.firstTimes;
        return(
            times.map(
                (time,index)=>{
                    return(
                        <div key={index} className="score-time">
                            <h5 className="score-time">{this.getTime(time.time)}</h5>
                            <span className="score-time">{time.username}</span>
                        </div>
                    )
                }
            )
        )
    };



    renderComments = ()=>{
        let comments = this.state.comments;
        return(
            comments.map(
                (comment,index)=>{
                    return(
                        <div key={index} className="comment">
                            <label>{comment.username}</label>
                            <p>{comment.comment}</p>
                            {this.renderDeleteLink(comment._id , comment.username)}
                        </div>
                    )
                }
            )
        )
    };

    renderDeleteLink=(commentId, userName)=>{
        if (sessionStorage.getItem('role')==='admin' || sessionStorage.getItem('username')===userName){
            return(
                <a name={commentId} onClick={this.deleteComment} className="text-danger delete-comment">Delete</a>
            )
        }
    };

    deleteComment=(e)=>{
        e.preventDefault();
       let id = e.target.name;
        requester.remove('appdata',`coments/${id}`,'kinvey',this.initialiseState).then(
        )
    };

    addCommentToState=(newComment)=>{
        this.stopLoading();
        let comments = this.state.comments;
        comments.push(newComment);
        this.setState({comments: comments},this.scrollBottom);
    };

    scrollBottom=()=>{
        let comments = document.getElementById("comments");
        if(comments){
            comments.scrollTop = comments.scrollHeight;
        }
    };


    render=()=>{
        if (!this.props.user) {
            return (
                <div>
                    <Navigation/>
                    <h1 style={{display: this.state.loading}}>Loading...</h1>
                    <div className="score-board">
                        <div className="first-times">
                            {<label>Top scores <i className="fa fa-star"></i></label>}
                            {this.renderFirstScores()}
                            <br/>
                            <label>
                                {sessionStorage.getItem('lastScore') ? 'Your last score ' + this.getTime(sessionStorage.getItem('lastScore')) : '' }
                            </label>

                        </div>
                        <div className="comments-section">
                            <label>Comments</label>
                            <div id="comments" className="comments">
                                {this.renderComments()}
                            </div>
                            <AddComment addCommentToState={this.addCommentToState}/>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <Navigation/>
                    <h1 style={{display: this.state.loading}}>Loading...</h1>
                    <div className="score-board">
                        <div className="first-times">
                            <label>My scores <i className="fa fa-star"></i></label>
                            {this.renderFirstScores()}
                            <br/>
                            <label>
                                {sessionStorage.getItem('lastScore') ? 'Your last score ' + this.getTime(sessionStorage.getItem('lastScore')) : '' }
                            </label>

                        </div>
                    </div>
                </div>
            )
        }
    }
}

