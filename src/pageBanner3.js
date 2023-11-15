import React from 'react'
import '../styles/style.css'

export default function PageBanner3(props) {
  // console.log(props);
  return <div className="container-fluid">
   
    <div className="row">
      <div className={props.Bannerclass} >
        <img src={props.Banner} alt='Banner' width="100%" />
        <div className="overlayBox">
          <h2 className="text-white"> {props.title} </h2>
          <p className='text-white'> {props.broadcom}</p>
        </div>
      </div>
    </div>
  
 
  </div>
}