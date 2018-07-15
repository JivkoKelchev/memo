/**
 * Created by Jivko on 14.7.2018 г..
 */
import React from 'react'
import requester from '../../utils/requester';

export default class AddComment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : sessionStorage.getItem('username'),
            comment : ''
        }
    }

    onChange =(e)=>{
        this.setState({
            comment: e.target.value
        }, ()=>(console.log(this.state.comment)));

    };

    onSubmit = (e) =>{
        e.preventDefault();
        //todo validaciq
        requester.post('appdata','coments','kinvey',{comment:this.state.comment, 'username':this.state.username},).then(
            (r)=>{this.props.addCommentToState(r)}
        );
        e.target.value = '';
    };

    render=()=>{
        if (sessionStorage.getItem('authtoken')){
            return(
                <form onSubmit={this.onSubmit}>
                    <div className="form-group add-comment">
                        <textarea onChange={this.onChange} className="form-control" id="exampleFormControlTextarea1" rows="3">
                        </textarea>
                        <input className="add" type="submit" value='Add'/>
                    </div>

                </form>
            )
        }else{
            return ''
        }
    }
}