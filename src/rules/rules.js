/**
 * Created by Jivko on 10.7.2018 г..
 */
const getRandomMatrix = (images) => {
    //items ще се подава на функцията
    //let items = [1,1,2,2,3,3,4,4,5,5,6,6];
    let items = [];
    for (let i=0; i<images.length; i++){
        if(images[i].number!=0){
            items.push(images[i].image);
            items.push(images[i].image);
        }
    }
    let rows = 3;
    let cols = 4;

    let matrix = [];


    let item;
    let itemIndex;

    //двоен цикъл за попълване на матрицата
    for(let row=0; row<rows; row++){
        matrix.push([]);
        for(let col=0; col<cols; col++){
            matrix[row].push([]);
            //произволен елемент от items
            itemIndex = Math.floor( Math.random() * (items.length) );
            item = items[itemIndex];

            //добавям в матрицата на пореден номер
            matrix[row][col]=item;

            //изваждам елемента от items
            items.splice(itemIndex, 1);

        }
    }

    return matrix;

};

const checkPairs = (item1, item2, matrix) => {
    let value1 = matrix[item1[0]][item1[1]];
    let value2 = matrix[item2[0]][item2[1]];

    return value1 === value2;
};

export default {getRandomMatrix, checkPairs}