import React from 'react'
import '../styles/style.css'

export default function PageBanner2(props) {
  // console.log(props);
  return <div className="container-fluid">
    
    <div className="row">
      <div className="aboutImgouter aboutImgouter2 d-flex" >
       <div className='col-md-6'>
       <div className="overlayBox2">
          <h1 className="text-white"> {props.title} </h1>
          <p className='text-white'> {props.broadcom}</p>
        </div>
       </div>
        
        <div className='col-md-6'>
        <img src={props.Banner} alt='img' width="100%" />
            </div>
      </div>
    </div>
  </div>
}