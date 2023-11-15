import React from 'react'
import '../styles/style.css'

export default function PageBanner(props) {
  // console.log(props);
  return <div className="container">
    
      <div className="aboutImgouter">
        <div className='aboutImgouter_container'>
          <div className="overlayBox">
            <h2 className="text-white"> {props.title} </h2>
            <p className='text-white'> {props.broadcom}</p>
          </div>
        </div>
        <div className='banner_container_img'>
            <img src={props.Banner}  width="100%"  />
        </div>
      </div>
  </div>
}