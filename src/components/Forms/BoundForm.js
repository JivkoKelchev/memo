/**
 * Created by Jivko on 13.7.2018 г..
 */
import React from 'react';

export default class BoundForm extends React.Component {
    constructor(props){
        super(props);
        this.state = this.stateFromChildren(this.props.children)
    }

    onChange = (e) => {
        if(e.target.type === 'file'){
            this.setState({[e.target.name]: btoa(e.target.files[0])})
        }else{
            this.setState({
                [e.target.name] : e.target.value
            },()=>(
                this.props.validationFn(this.state)
            ))
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.submitFn(this.state);
    };

    render = () => {
        return(
            <form className="regular-form" onSubmit={this.onSubmit}>
                {React.Children.map(this.props.children, child => {
                    if(child.type==='input' && child.props.name){
                        return(
                            <input onChange={this.onChange} value={this.state[child.name]} {...child.props} />
                        )
                    }
                    return child;
                })}
            </form>
        )
    }

    stateFromChildren = (children) => {
        const inputs = {};

        React.Children.forEach(children, child => {
            if(child.type==='input' && child.props.name){
                if(!child.props.value){
                    inputs[child.props.name]=''
                }else{
                    inputs[child.props.name]=child.props.value
                }
            }
        });
        return inputs;
    };
}