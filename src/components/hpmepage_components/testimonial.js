import React from 'react';
import user from '../../images/New-images/signup.png';
import StarRatings from "react-star-ratings";
import OwlCarousel from 'react-owl-carousel';


const Mobresponsive = {
    options:{
      loop: true,
      nav:false,
      dots: false,
      responsive:{
          0:{
              items:1,
              nav:false
          },
          600:{
              items:2,
              nav:false
          },
          1000:{
              items:3,
              nav:false
          }
      }
  }
    };
export default function Testimonial(props){
    return <>
        <div className='Upcoming_container testimonial_container'>
            <div className='up_coming_head1 text-center'>
                <p className="daily-horoscope-header">
                    <span className="horoscope">{'Customers Testimonials'}</span>
                    <span className="daily">{''} </span>
                </p>
                
                <p>Here about us from our customers </p>
            </div>
            <div className='up_coming_body'>
                <OwlCarousel 
                    className='owl-theme mt-5'
                    {...Mobresponsive.options}
                    >
                        <div className="testimonial_item">
                            <div className="testimonial_item_card">
                                <div className='event_card_img text-center'>
                                    <img className="" alt='Ravi Gupta' src={user}  width={'50px'}/>
                                </div>
                                <div className='event_card_details1'>
                                    <div className="ecvent_card_Title1 text-center">
                                        <p><strong>{'Shubham Jamuda'} </strong></p>
                                        <p className="date">{"Sturdy and distinct with easy go UI. This is the first time I've tried to go astro-playstore and I'm pleased to confess without disappointment"}</p>
                                    </div>
                                    <div className=''>
                                    <StarRatings
                                        rating={5}
                                        starRatedColor="#FF9C05"
                                        starEmptyColor="#707070"
                                        starDimension="20px"
                                        starSpacing="1px"
                                        name="rating"
                                    />
                                    </div>
                                </div>
                            </div> 
                    </div>
                            
                        
                        <div className="testimonial_item">
                            <div className="testimonial_item_card">
                                <div className='event_card_img text-center'>
                                    <img className="" alt='Vivek Pawar' src={user}  width={'50px'}/>
                                </div>
                                <div className='event_card_details1'>
                                    <div className="ecvent_card_Title1 text-center">
                                        <p><strong>{'Vivek Pawar'} </strong></p>
                                        <p className="date">{"Nice app. I just needed to check my kundali. Kundali looks fine. Freematch making tool, an extra feature found in the app, appreciate the team."}</p>
                                    </div>
                                    <div className=''>
                                    <StarRatings
                                        rating={5}
                                        starRatedColor="#FF9C05"
                                        starEmptyColor="#707070"
                                        starDimension="20px"
                                        starSpacing="1px"
                                        name="rating"
                                    />
                                    </div>
                                </div>
                            </div> 
                    </div>

                    <div className="testimonial_item">
                            <div className="testimonial_item_card">
                                <div className='event_card_img text-center'>
                                    <img className="" alt='Ravi Gupta' src={user}  width={'50px'}/>
                                </div>
                                <div className='event_card_details1'>
                                    <div className="ecvent_card_Title1 text-center">
                                        <p><strong>{'Prathamesh Shahasane'} </strong></p>
                                        <p className="date">{"Very nice app. I had one query & they resolved it very quickly. Very nice customer support. I definitely recommend this app to everyone."}</p>
                                    </div>
                                    <div className=''>
                                    <StarRatings
                                        rating={5}
                                        starRatedColor="#FF9C05"
                                        starEmptyColor="#707070"
                                        starDimension="20px"
                                        starSpacing="1px"
                                        name="rating"
                                    />
                                    </div>
                                </div>
                            </div> 
                    </div>
                </OwlCarousel>
            </div>
        </div>
    </>
}