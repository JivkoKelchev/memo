/**
 * Created by Jivko on 12.7.2018 г..
 */
import React from 'react';

export default class Timer extends React.Component{

    render = () => {
        return(
            <div className="Timer">
                <h2 style={{color:"white"}}>{
                    this.props.time
                }</h2>
            </div>

        )
    }
}


