/**
 * Created by Jivko on 14.7.2018 г..
 */
import React from 'react';


class PreLoader extends React.Component
{
        constructor(props){
                super(props)
        }

        render = () => {
            return (<div className="loader" style={{display:this.props.loading}}>
                        <h1>Loading...</h1>
                </div>
            )
        }

}

export default PreLoader;