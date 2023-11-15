import React from 'react'

export default function PlanetryCard(props) {
  return (
  
        
        <div className='carouselCard'>
        <div class="card planetry" >
        <img class="img-circle" src={props.CardImg}alt='planetry' />
            <div className="card-body">
                <div className='card-body-container'>
                <h5 class="card-title">{props.Cardtitle}</h5>
                <p class="card-text">{props.Carddescription}</p>                
                </div>
            </div>
        </div>
   
       
             
        </div>
 
  )
}
