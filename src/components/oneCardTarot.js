import React, { useState } from 'react'
import Footer from '../common/Footer';
import Header2 from '../common/Header2'
import PageBanner from '../common/pageBanner'
import { getCommonHeaders, SEO } from "../configuration/commonFunctions";
import Banner from '../images/upcomingEvents/Rectangle 74.png'
import cardimg from '../images/Ellipse 22.png';
import cardimg1 from '../images/Ellipse 25.png';
import cardimg2 from '../images/Ellipse 28.png';
import cardimg3 from '../images/Ellipse 24.png';
import PageBanner3 from '../common/pageBanner3';
import FestiveCarousel from '../common/FestiveCarousel';
import CardReading from '../images/upcomingEvents/Rectangle 84.png';
import LoveCard from '../images/upcomingEvents/Rectangle 84.png'
import LineImg from '../images/upcomingEvents/Rectangle 89.png'

export default function OneCardTarot(props) {
    const [state, setState] = useState({
        displaySignupPopUp: false,
        loginSelected: false,
        isHeaderOpen: false,
        countryCode: [],

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
            <PageBanner3 Bannerclass={"aboutImgouter" + " " + "bgonecard"} Banner={Banner} title={'One Card Tarot Cards'} broadcom={'Home/ Tarot Cards/ One Card Tarot'} style={{ background: '#ff9c05' }} />

            <div className='marriage_contanier mt-5'>
                <div className='container'>
                    <div className='upcoming-fest-container text-left'>
                        <h3>Get Your<span>One Card</span></h3>
                        <div className='containerform mt-4'>
                            <div className='row'>
                                <div class="form-group col-md-9 col-7">
                                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter Name" />
                                </div>
                                <div className='col-md-3 col-5 form-btn'>
                                    <button className="btn  btn-color ">Submit</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='upcoming-fest-container text-left mt-4'>
                        <h3>One Card<span>Tarot</span></h3>
                        <p>Do you wish to know how your future will be or whether problems in life will be gone or not? Well, the One card reading here is a perfect solution for it. Be it any issue— related to love, career, finance, or health, this tarot card reading will give you a proper insight into your life and the problems connected with it. Easily you can go through any problem in your life by yourself using this tarot card reading calculator online. Moreover, one card prediction also helps you choose a better course of action, or sometimes it provides a glimpse of what could be in the box for you next.</p>
                        <p>One card prediction at Astrotalk is an efficient tool, unlike other websites, lets you understand even one of the most complex situations. This tool of tarot card reading also helps you acknowledge the opportunities that shall be in your way and eliminates confusion and emotions in the best possible way. We only need your name, and you only need to think about your question, and even the most tangled thoughts in your head will resolve this tarot card reading.</p>
                        <p>The deeper you think about your question, the better results you will get in your one card pull. Make sure nothing prompts your mind, and you are clear about what you want to know. Especially when you are anxious, lost, or overwhelmed, one card is the on-spot guidance to clear your head about the heavy mess and tension running in your life and live your time ahead prepared and ready for the bad times that may come.</p>



                    </div>



                </div>

            </div>
            <Footer history={props} />
        </>
    )
}

