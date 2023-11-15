import React from 'react'
import '../styles/style.css'

export default function FaceReadingCard(props) {

  return (
    <>
         <div className='carouselCard'>
        <div class="card" >
        <img class="img-circle" src={props.Imgs} alt='img' />
            <div className="card-body">
                <div className='card-body-container'>
                <h5 class="card-title">{props.Title}</h5>
                <p class="card-text">{props.description}</p>
                </div>
              
            </div>
        </div>
   
       
    </div>
    </>
  )
}