import React from 'react';
import LineImg from '../images/upcomingEvents/Rectangle 89.png'


const VatCarouselDetails = ({vatCarouselDetail}) => {
    const {name, address, description, img} = vatCarouselDetail;

    return (
        <div className='carouselCard'>
        <div class="card" >
        <img class="img-circle" src={img} alt='vrat' />
            <div className="card-body">
            <div className='titlecontainer'>
                   
                    
                </div>
                <div className='card-body-container'>
                <h5 class="card-title">{name}</h5>
                <p class="card-text">{description}</p>
                <a href="#" class="btn  btn-color">Reacd More</a>
                </div>
              
            </div>
        </div>
   
       
    </div>
        // <div class="item">
        //     <div class="shadow-effect">
        //         <img class="img-circle" src={img} />
        //         <p>{description}</p>
        //     </div>
        //     <div class="testimonial-name">
        //         <h5>{name}</h5>
        //         <small>{address}</small>
        //     </div>
        // </div>
    );
};

export default VatCarouselDetails;