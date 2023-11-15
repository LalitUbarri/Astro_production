import React, { useState } from 'react'
import Footer from '../common/Footer';
import Header2 from '../common/Header2'
import PageBanner from '../common/pageBanner'
import { getCommonHeaders, SEO } from "../configuration/commonFunctions";
import Banner from '../images/upcomingEvents/planetry.png';
import Jupitor from '../images/upcomingEvents/jupiter.png';
import Meteor from '../images/upcomingEvents/meteor.png'
import PageBanner3 from '../common/pageBanner3';
import PlanetryCard from '../components/planetryCard';
import Chat_Talk_Header from "../common/Chat&Talk_Header";

export default function PlanetryTransits(props) {
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
             <Chat_Talk_Header
                IsNavIconTrue={false}
                IsSearchTrue={false}
                IsFilterTrue={false}
                // editSearchTerm={this.editSearchTerm}
                // editSortTerm={this.editSortTerm}
                // IsMob_Side_Nave={this.IsMob_Side_Nave}
                propsData={props}
                CustomClass={true}
                IsTitleTrue={true}
                title={"Planetry Transit"} 
                />
            <PageBanner3 Bannerclass={"aboutImgouter" + " " + "bgonecard"} Banner={Banner} title={'Planetary Transit 2023'} broadcom={'Home/Planetary Transit 2023'} style={{ background: '#ff9c05' }} />

            <div className='marriage_contanier mt-5'>
                <div className='container'>
                    <div className='upcoming-fest-container text-left'>
                        <h3>Top Ten Spectacular Celestial <br /> <span>Events to Observe in 2023</span></h3>
                        <div className='containerform mt-4'>
                            {/* <div className='row'>
                                <div class="form-group col-md-9 col-sm-9">
                                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter Name" />
                                </div>
                                <div className='col-md-3 col-sm-3 form-btn'>
                                    <button className="btn  btn-color ">Submit</button>
                                </div>
                            </div> */}
                        </div>

                    </div>
                    <div className='upcoming-fest-container text-left mt-5'>
                        <h3>February 2: Comet C/2022 E3 <br /> comes close to Earth</h3>
                        <p>On February 2nd, Comet C/2022 E3 will make a close approach to Earth, coming within approximately 26.4 million miles of our planet. This proximity marks the closest the comet has been to Earth since the time when Homo sapiens started inhabiting Europe and Asia after migrating from Africa. While the brightness of comets can be unpredictable, this particular comet might be visible to the naked eye when viewed under dark skies. However, using binoculars or a telescope will significantly improve the chances of observing it. In January, stargazers in the Northern Hemisphere may be able to spot the comet in the morning sky towards the northwest. As for those in the Southern Hemisphere, they should keep a lookout starting in early February. The comet exhibits a distinct green color and possesses a faint, elongated tail.</p>
                    </div>
<div className='row'>
    <div className='col-md-6'>
    <PlanetryCard CardImg={Jupitor} Cardtitle={"March 1: Venus-Jupiter conjunction"} Carddescription={"In the early months of the year, the two most luminous planets will gradually approach each other in the southwestern sky. On March 1st, they will reach their nearest distance from one another. Both planets should be visible to the naked eye, and even the smallest backyard telescope will allow you to observe them within the same field of view, as mentioned by Andrew Fazekas of National Geographic. It's important to note that despite their apparent closeness, the two planets remain millions of miles apart. To witness this celestial event, direct your gaze towards the west-southwest during dusk, and you will witness the two planets side by side."}/>
    </div>
    <div className='col-md-6'>
    <PlanetryCard CardImg={Meteor} Cardtitle={"April 15 to April 29: Lyrid meteor shower"} Carddescription={"This year, the peak of the Lyrids shower is expected on the night of April 22nd, and the conditions for viewing are expected to be favorable. According to Dobrijevic, the waxing crescent moon will only be 6 percent illuminated, allowing for better visibility of the meteors. On a clear, dark sky, observers typically witness around 18 meteors per hour during the Lyrids shower. However, there have been rare instances where the Lyrids have surprised viewers with a remarkable display of up to 100 meteors per hour."}/>
    </div>
</div>

                </div>

            </div>
            <Footer history={props} />
        </>
    )
}

