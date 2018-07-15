/**
 * Created by Jivko on 10.7.2018 г..
 */
import React from 'react';

import Card from './Card';
import rules from '../../rules/rules';

export default class Board extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            images : JSON.parse(sessionStorage.getItem('images')),
            first : {image : '', row : '', col : ''},
            second : {image : '', row : '', col : ''},
            pairsLeft : 6,
            solved : [],
            flipped : [],
            matrix : rules.getRandomMatrix(JSON.parse(sessionStorage.getItem('images'))),
            timer : 'off'
        };

    }

    cardClick = (cardObject) => {
        let first = this.state.first;
        let second = this.state.second;
        let pairs = this.state.pairsLeft;
        let flipped = this.state.flipped;

        this.props.startGameFn();

        if (!first.image || (first.image && second.image) ){
            //ако няма отворена карта, отвори
            flipped = [];
            flipped.push(cardObject);
            this.setState({first: cardObject, second:{image: '', row: '', col: ''}, flipped : flipped});
        }else{
        //ако има отворена карта, провери стойностите
            //ако намеря двойката
            if (first.image === cardObject.image && (first.row !== cardObject.row || first.col !== cardObject.col)) {
                this.setState({
                    first: {image: '', row: '', col: ''},//изчиствам първата
                    pairsLeft: (pairs - 1),//намалям останалите двойки
                    flipped : []//изчиствам обърнатите карти
                },
                ()=>{this.props.setPairsLeft(pairs-1)}
                );
                this.addToSolved(first, cardObject);//добавям в откритите двойки

            //ако кликна на същата карта
            }else if (first.row === cardObject.row && first.col === cardObject.col){
                this.setState({
                    first: {image: '', row: '', col: ''},
                    flipped : []//изчиствам обърнатите карти
                });
             //ако картата не съответства на първата
            }else{
                flipped.push(cardObject);
                this.setState({
                    second: cardObject,
                    flipped : flipped//отварям втора карта
                });
            }
        }
    };

    addToSolved = (card1, card2) =>{
        let solvedArray = this.state.solved;
        solvedArray.push(card1);
        solvedArray.push(card2);
        this.setState({solved : solvedArray})

    };

    isSolved = (obj) => {
        let a = this.state.solved;
        let i = a.length;

        while (i--) {
            if (JSON.stringify(a[i]) === JSON.stringify(obj)) {
                return true;
            }
        }
        return false;
    };

    isFlipped=(row,col)=>{
        let flipped = this.state.flipped;
        for( let i = 0; i< flipped.length; i++ ) {
            if (row === flipped[i].row && col === flipped[i].col) {
                return 'flip'
            }
        }
        return '';
    };

    render = () => {
        let cardsMatrix = this.state.matrix;
        return (
            <div className="board">
                {cardsMatrix.map(
                    (row, ri) => {
                        return(
                            <div className="row" key={ri}>
                                {row.map(
                                    (card, ci) => (
                                        <Card
                                            row = {ri}
                                            col = {ci}
                                            key={ri*4 + ci}
                                            image={card}
                                            solved = { this.isSolved({image: card, row : ri, col : ci})}
                                            flip = {this.isFlipped(ri,ci)}
                                            cardClick={this.cardClick.bind(this)}
                                        />
                                    )
                                )}
                            </div>
                        )
                    }
                )}
            </div>
        )
    }

}