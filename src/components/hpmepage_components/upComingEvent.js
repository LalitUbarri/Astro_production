import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { ScrollTop } from '../../configuration/commonFunctions';
import {FRONTEND_NAME} from '../../configuration/constants';
import {useHistory} from 'react-router-dom';
import '../../styles/dailyHoroscope.css';

const Mobresponsive = {
    options:{
      loop: true,
      nav:true,
      dots: false,
      responsive:{
          0:{
              items:2,
              nav:true
          },
          600:{
              items:2,
              nav:true
          },
          1000:{
              items:3,
              nav:true
          }
      }
  }
};


export default function UpComingEvent1(props){
    const history = useHistory();
    // console.log(props);
    return <>
        <div className='Upcoming_container mt-5'>
            <div className='up_coming_head text-left'>
                <p className="daily-horoscope-header">
                    <span className="horoscope">{props.blackTitle}</span>
                    <span className="daily">{props.whiteTitle} </span>
                </p>
            </div>
            <div className='up_coming_body'>
                <OwlCarousel 
                    className='owl-theme mt-5 Up_comingEvent_Nav'
                    {...Mobresponsive.options}
                    >
                        {
                            props.data.map((item,i) => {
                                var url = item.title;
                                url = url.replace(/\s+/g, '-')

                                return <div className="event_item" key={i} onClick={ props.Isblog ? () => {
                                    ScrollTop(0);
                                    history.push(FRONTEND_NAME + '/articles/' + url)
                                } : () => {
                                    
                                    history.push(FRONTEND_NAME + '/upcoming-festivals-vatpurnima')
                                }}>
                                <div className="event_card">
                                    <div className='event_card_img'>
                                        <img className="horoscopeimg" src={item.banner} alt='horoscopeimg' />
                                    </div>
                                    <div className='event_card_details'>
                                        <div className="ecvent_card_Title text-left">
                                            <p><strong>{item.title.substring(0,65)} </strong></p>
                                            <p className="date">{props.Isblog ? null: item.date}</p>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            })
                        }
                    {/* <div className="event_item">
                        <div className="event_card">
                            <div className='event_card_img'>
                                <img className="horoscopeimg" src={Rath} />
                            </div>
                            <div className='event_card_details'>
                                <div className="ecvent_card_Title text-left">
                                    <p><strong>{'Vat Purnima Vrat'} </strong></p>
                                    <p className="date">{'03 June  2023'}</p>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="event_item">
                        <div className="event_card">
                            <div className='event_card_img'>
                                <img className="horoscopeimg" src={Yogini} />
                            </div>
                            <div className='event_card_details'>
                                <div className="ecvent_card_Title text-left">
                                    <p><strong>{'Vat Purnima Vrat'} </strong></p>
                                    <p className="date">{'03 June  2023'}</p>
                                </div>
                            </div>
                        </div> 
                    </div> */}
                </OwlCarousel>
            </div>
        </div>
    </>
}