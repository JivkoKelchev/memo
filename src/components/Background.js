/**
 * Created by Jivko on 12.7.2018 г..
 */
import React from 'react';
import plumbus from '../Images/plumbus2.png';
import box from '../Images/Box.png';
const Background = () => {
  return(
      <div className="background">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span> <img src={box} alt="box"/></span>
          <span> <img src={box} alt="box"/></span>
          <span> <img src={plumbus} alt="plumbus"/></span>
          <span> <img src={plumbus} alt="plumbus"/></span>
          <span> <img src={plumbus} alt="plumbus"/></span>
      </div>
  )
};

export default Background;