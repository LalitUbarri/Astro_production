import React, { useEffect, useState } from 'react'
import Footer from '../common/Footer';
import Header2 from '../common/Header2'
import PageBanner from '../common/pageBanner'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../styles/dailyHoroscope.css';
import {SEO,BirthdayForcast } from "../configuration/commonFunctions";
// import Banner from '../images/upcomingEvents/kalsharp.png';
// import Jupitor from '../images/upcomingEvents/jupiter.png';
// import Meteor from '../images/upcomingEvents/meteor.png'
// import PageBanner2 from '../common/pageBanner2';
// import PlanetryCard from '../components/planetryCard';
// import Mangal1 from '../images/upcomingEvents/kalsharp1.png';
// import Mangal2 from '../images/upcomingEvents/kalsharp2.png';
import Chat_Talk_Header from "../common/Chat&Talk_Header";
import OwlCarousel from 'react-owl-carousel';
// import UpComingEvent1 from './hpmepage_components/upComingEvent';
// import { set } from 'date-fns';

const Mobresponsive = {
    options:{
      loop: true,
      nav:true,
      dots: false,
      responsive:{
          0:{
              items:1,
              nav:true
          },
          600:{
              items:2,
              nav:true
          },
          1000:{
              items:3,
          }
      }
    }
}
export default function BirthdayForcast1(props) {
    const [state, setState] = useState({
        displaySignupPopUp: false,
        loginSelected: false,
        isHeaderOpen: false,
        filterData: [],

    })

    const { displaySignupPopUp, loginSelected, countryCode } = state


    const openSignupPopup = () => {
        setState({
            displaySignupPopUp: true,
            loginSelected: false,
        });
    };

    const openLoginPopup = () => {
        setState({ displaySignupPopUp: true, loginSelected: true });
    };

    const changeIsHeaderOpen = (headerOpen) => {
        setState({
            isHeaderOpen: headerOpen
        })
    }

    const onClickHandle=(date)=>{
      let dad =  BirthdayForcast.filter(item => item.date === date)
      console.log(dad);
      setState({
        ...state,
        filterData:dad
      })
    }

    useEffect(()=> {
        onClickHandle('Tuesday,  1st August 2023');
    },[]);
    return (
        <>
            <SEO
                keywords='Face Reading Astrology'
                title="Face Reading Astrology Insights | astroking"
                description="Unlock hidden insights with face reading astrology. Explore the power of astroking for accurate face analysis and predictions"
            />
            <Header2
                IsActive_header_Or_not="chat_and_talk_header-"
                openLoginPopup={openLoginPopup}
                openSignupPopup={openSignupPopup}
                isLogin={loginSelected}
                countryCode={countryCode}
                changeIsHeaderOpen={changeIsHeaderOpen}
            />
            <Chat_Talk_Header
            IsNavIconTrue={false}
            IsSearchTrue={false}
            IsFilterTrue={false}
            propsData={props}
            CustomClass={true}
            IsTitleTrue={true}
            title={"Birthday Forecast"} 
            />
            <PageBanner Banner={''} title={'Birthday Forecast'} broadcom={'Home/ Birthday Forecast'} />
            
            <div className='container'>
                <div className='Upcoming_container'>
                    <div className='up_coming_head text-left'>
                        <p className="daily-horoscope-header">
                            <span className="horoscope">{'Birthday'}</span>
                            <span className="daily">{' Forecast'} </span>
                        </p>
                    </div>
                    <div className='upcoming-fest-container'>
                        <div className='up_coming_body'>
                            <OwlCarousel 
                                className='owl-theme mt-5 Up_comingEvent_Nav'
                                {...Mobresponsive.options}
                                >
                                    {
                                        BirthdayForcast.map((item,i) => {
                                            // var url = item.title;
                                            // url = url.replace(/\s+/g, '-')

                                            return <div className="event_item" key={i} onClick={() => onClickHandle(item.date)}>
                                            <div className="event_card">
                                                <div className='event_card_img'>
                                                    {/* <img className="horoscopeimg" src={''} alt='horoscopeimg' /> */}
                                                </div>
                                                <div className='event_card_details'>
                                                    <div className="ecvent_card_Title text-left">
                                                        <p><strong>{item.date} </strong></p>
                                                        <p className="date">{item.OutDisc.substring(0,310)}</p>
                                                        
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                        })
                                    }
                            </OwlCarousel>
                        </div>
                    </div>
                    {state.filterData.map(item=> (
                        <div className='text-left'>
                            <h3>{item.date}</h3>
                            {item.disc}

                            <p>Lucky dates : {item.LuckyDates}</p>
                            <p>Lucky Days : {item.LuckyDays}</p>
                            <p>Lucky Colors	: {item.LuckyColours}</p>
                        </div>
                    ))}
                </div>
            </div>
                 
            <Footer history={props} />
        </>
    )
}

