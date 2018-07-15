/**
 * Created by Jivko on 10.7.2018 г..
 */
import React from 'react';

export default class Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            image : this.props.image,
            row : this.props.row,
            col : this.props.col,
        }
    }

    flipCard(){
        let cardObject = {
            image : this.state.image,
            row : this.state.row,
            col : this.state.col
        };
        this.props.cardClick(cardObject);
    }

    render = () =>
    {
        let cards = JSON.parse(sessionStorage.getItem('images'));
        let cardBack='';
        for(let i = 0; i< cards.length; i++){
            if(cards[i].number==0){
                cardBack=cards[i].image
            }
        }
        // let cardBack = cards[0].image;
        if (this.props.solved){
            return(
                <div className={"flip-container cards flip"}>
                    <div className="flipper">
                        <div className="front">
                            {/*<span>{this.props.image}</span><br/>*/}
                            {/*<h1>ok</h1>*/}
                            {/*front*/}
                            <img className="card-image" src={cardBack} alt="alt"/>
                        </div>
                        <div className="back">
                            <img className="card-image" src={this.props.image} alt="alt"/>
                            {/*<span>{this.props.image}</span><br/>*/}
                            {/*<h1>ok</h1>*/}
                            {/*back*/}
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className={"flip-container cards  " + this.props.flip}
                    onClick={this.flipCard.bind(this)}>
                    <div className="flipper">
                        <div className="front">
                            {/*<span>{this.props.image}</span><br/>*/}
                            {/*front*/}
                            <img className="card-image" src={cardBack} alt="alt"/>
                        </div>
                        <div className="back">
                            {/*<span>{this.props.image}</span><br/>*/}
                            {/*back*/}
                            <img className="card-image" src={this.props.image} alt="alt"/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}