import React from 'react';
import LineImg from '../images/upcomingEvents/Rectangle 89.png'
import { HTTP1,FRONTEND_NAME } from '../configuration/constants';


const FestiveCarouselDetails = ({festiveCarouselDetail},) => {
    const {name, description, img} = festiveCarouselDetail;

    return (
        <div className='carouselCard' onClick={() => window.location.href = HTTP1 + FRONTEND_NAME + '/tarot-cards-onecard-tarot'}>
        <div class="card" >
        <img class="img-circle" src={img} alt='festival' />
            <div className="card-body">
            <div className='titlecontainer'>
                    <img src={LineImg}  alt='line'/>
                    
                </div>
                <div className='card-body-container'>
                <h5 class="card-title">{name}</h5>
                <p class="card-text">{description}</p>
                <a href="" class="btn  btn-color">Reacd More</a>
                </div>
              
            </div>
        </div>
    </div>
    );
};

export default FestiveCarouselDetails;