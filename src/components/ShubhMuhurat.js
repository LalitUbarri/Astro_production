import React, { useState } from 'react'
import Footer from '../common/Footer';
import Header2 from '../common/Header2'
import PageBanner from '../common/pageBanner'
import { ShubhMuhurats, SEO } from "../configuration/commonFunctions";
import Banner from '../images/Rectangle 33.png'
import cardimg from '../images/Ellipse 22.png';
import cardimg1 from '../images/Ellipse 25.png';
import cardimg2 from '../images/Ellipse 28.png';
import cardimg3 from '../images/Ellipse 24.png';
import { FRONTEND_NAME } from '../configuration/constants';

export default function ShubhMuhuratToday(props) {
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

    const rediractionUrlhandle = (type) => {
        var url = type;
        url = url.replace(/\s+/g, '-');
        props.history.push(FRONTEND_NAME + '/shubh-muhurat/' + url)

        var dd = ShubhMuhurats.find(item => item.name === type);
        setState({
            ...state,
            filterData: dd,
            listData: dd && dd.list
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
            <PageBanner Banner={''} title={'Shubh Muhurat Today'} broadcom={' Home/ shubh suhurat today'} />

            <div className='marriage_contanier'>
                <div className='container'>
                    <div className='marriage_headeing mt-5 mb-5 text-left'>
                        <h3> The Importance of Shubh Muhurat: Meaning, <br /> Significance, and Determining Factors </h3>

                        <p> In the vast tapestry of Indian culture and traditions, the concept of Shubh Muhurat holds a special place. Translated as "auspicious time" or "favorable moment," Shubh Muhurat plays a crucial role in various aspects of life, including weddings, inaugurations, and other significant events. This blog explores the meaning and significance of Shubh Muhurat, as well as the factors that determine its occurrence.</p>

                        <p>Shubh Muhurat refers to a specific period or duration believed to be auspicious and propitious for commencing important activities or events. It is believed that starting a venture or performing a task during a Shubh Muhurat enhances the chances of success and prosperity while minimizing obstacles and negative influences.</p>

                        <p><strong>Shubh Muhurat Meaning and Significance:</strong></p>
                        <p>The significance of Shubh Muhurat lies in its association with positive cosmic energies. According to Hindu astrology and Vedic traditions, the alignment of celestial bodies and planetary positions influences various aspects of our lives. By identifying and adhering to a Shubh Muhurat, one aligns their actions with the favorable energies of the universe, thereby increasing the likelihood of a positive outcome.</p>

                        <p>Shubh Muhurat holds immense importance in ceremonies like weddings, engagements, housewarming, business inaugurations, and religious rituals. It is believed that initiating these events during an auspicious time ensures harmony, blessings, and success. Shubh Muhurat also plays a role in everyday activities such as buying property, starting a journey, or even naming a child, where it helps in attracting positive energies and warding off potential obstacles.</p>

                        <p><strong>Aspects Determining Shubh Muhurat:</strong></p>
                        <p>Several factors are considered when determining a Shubh Muhurat. Astrologers, pandits, and scholars analyze various astrological and planetary positions to identify favorable timings for specific events. Here are some crucial aspects that influence the selection of a Shubh Muhurat:</p>

                        <p>Planetary Positions: The positions of celestial bodies, particularly the Moon, are carefully examined. The Moon's position in relation to other planets and constellations is believed to have a significant impact on the energy flow during a specific time.</p>

                        <p><strong>Tithi (Lunar Day): </strong> The lunar day or Tithi plays a vital role in determining the auspiciousness of a Muhurat. Each Tithi has its own characteristics and is associated with different deities and planetary influences.</p>

                        <p> <strong>Nakshatra (Lunar Mansion): </strong>  The Nakshatra or the lunar mansion in which the Moon is located is considered when selecting a Shubh Muhurat. Different Nakshatras have distinct attributes and ruling deities that can impact the outcome of an event.</p>

                        <p><strong>Weekdays: </strong>  Certain weekdays are considered more favorable for specific activities based on their association with particular deities or planetary influences. For example, Thursday is considered auspicious for starting a new business venture as it is associated with Lord Vishnu.</p>

                        <p><strong> Panchang (Almanac): </strong> The Panchang is a Hindu calendar that provides essential information about astronomical data, planetary positions, and auspicious timings. It serves as a valuable resource for determining Shubh Muhurats.</p>

                        <p>Shubh Muhurat holds immense significance in Indian culture and traditions. It acts as a guiding principle that enables individuals to synchronize their actions with cosmic energies and maximize the chances of success and prosperity. By selecting an auspicious time to initiate important events, one invites positive forces into their lives and seeks the blessings of the divine. Whether it's a wedding, a business launch, or any other milestone, embracing a Shubh Muhurat creates an atmosphere of harmony, hope, and optimism. Therefore, understanding the meaning and significance of Shubh Muhurat and following it diligently can contribute to a more fulfilling and prosperous life.</p>
                    </div>

                    <div className='d-flex column-gap-30 flex-wrap mt-5'>
                        <div class="card shub_card text-center" onClick={() => rediractionUrlhandle('Annanprashan Muhurat 2023')}>
                            <img src={cardimg} class="card-img-top" alt="Annanprashan Muhurat 2023" />
                            <div class="card-body text-left">
                                <p><strong>Annanprashan Muhurat 2023</strong> </p>
                                <p class="card-text text-secondary">Want to know the significance of shubh muhurat </p>
                                <button class="btn btn-bg">Read More &nbsp;&nbsp;&nbsp;<i class="bi bi-arrow-right fa-5"></i></button>
                            </div>
                        </div>

                        <div class="card shub_card text-center" onClick={() => rediractionUrlhandle('Marriage Muhurat in 2023')}>
                            <img src={cardimg1} class="card-img-top" alt="Marriage Muhurat 2023" />
                            <div class="card-body">
                                <p><strong>Marriage Muhurat 2023</strong> </p>
                                <p class="card-text text-secondary">Want to know the significance of shubh muhurat </p>
                                <button class="btn btn-bg">Read More &nbsp;&nbsp;&nbsp;<i class="bi bi-arrow-right fa-5"></i></button>
                            </div>
                        </div>

                        <div class="card shub_card text-center"  onClick={() => rediractionUrlhandle('Griha Pravesh Muhurat 2023')}>
                            <img src={cardimg2} class="card-img-top" alt="Griha Pravesh Muhurat 2023" />
                            <div class="card-body">
                                <p><strong>Griha Pravesh Muhurat 2023</strong> </p>
                                <p class="card-text text-secondary">Want to know the significance of shubh muhurat </p>
                                <button class="btn btn-bg">Read More &nbsp;&nbsp;&nbsp;<i class="bi bi-arrow-right fa-5"></i></button>
                            </div>
                        </div>

                        <div class="card shub_card text-center" onClick={() => rediractionUrlhandle('Car/Bike Muhurat 2023')}>
                            <img src={cardimg3} class="card-img-top" alt=" Car/Bike Muhurat 2023" />
                            <div class="card-body">
                                <p><strong> Car/Bike Muhurat 2023</strong> </p>
                                <p class="card-text text-secondary">Want to know the significance of shubh muhurat </p>
                                <button class="btn btn-bg">Read More &nbsp;&nbsp;&nbsp;<i class="bi bi-arrow-right fa-5"></i></button>
                            </div>
                        </div>
                    </div>

                    {
                        state.filterData && <>
                            <h3 className='text-left mt-5'> {state.filterData.name} </h3>
                            <div className='d-flex column-gap-30 flex-wrap mt-5'>
                                {state.listData && state.listData.map((item, i) => {
                                    return <button key={i} className='btn btn-outline-secondary mb-3'>{item} </button>
                                })}
                            </div>

                        </>
                    }


                </div>
            </div>
            <Footer history={props} />
        </>
    )
}

