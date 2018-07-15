/**
 * Created by Jivko on 14.7.2018 г..
 */
import React from 'react'
import requester from '../../utils/requester'


export default class ImageForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            images : JSON.parse(sessionStorage.getItem('images')),
            newImage : '',
            newImageIndex : ''
        };

    }

    onChange=(e)=>{
        this.getBase64(e.target.files[0],e.target.name, this.setNewImage);
    };

    setNewImage = (image, index) => {
        this.setState({
            newImage: image,
            newImageIndex: index
        },()=> {
            let images = this.state.images;
            images[index].image = this.state.newImage;
            this.setState({images: images}, () => {
                requester.update('appdata', `cards/${this.state.images[index]._id}`,'kinvey',this.state.images[index]).then()
            });
        })
    };

    getBase64=(file, index, callback) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
                callback(reader.result, index)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };


    renderCurrentImages=()=>{
        let images = this.state.images;
        return(
            images.map((i, index)=>{
                return(
                    <div key={i.number} className="image-input-container">
                        <img className="card-image" src={i.image} alt="alt"/>
                        <label htmlFor={i.number}>{i.number == 0 ?  'New cards back' :  'New card '+ i.number}</label>
                        <input onChange={this.onChange} id={i.number} className="input-image .form-control-file form-control-sm" type="file" name={index}/>
                    </div>
                )
            })
        )
    };

    render=()=>{
        return (
            <form className="image-form">

                    {this.renderCurrentImages()}

            </form>
            )

    }
}