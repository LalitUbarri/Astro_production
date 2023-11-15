import React, { useState } from 'react'
import Footer from '../common/Footer';
import Header2 from '../common/Header2'
import PageBanner from '../common/pageBanner'
import { getCommonHeaders, SEO } from "../configuration/commonFunctions";
import Banner from '../images/upcomingEvents/vatpurnima.png';

import PageBanner3 from '../common/pageBanner3';
import VatCarousel from '../common/VatCarousel';
import Vat1 from '../images/upcomingEvents/vat1.png';
import Next from '../images/upcomingEvents/next.png';
import Prev from '../images/upcomingEvents/previous.png';
import Chat_Talk_Header from "../common/Chat&Talk_Header";



export default function VatPurnima(props) {
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
            title={"Vat Purnima Vrat"} 
            />
            <PageBanner3 Bannerclass={"aboutImgouter" + " " + "bgonecard"} Banner={Banner} title={'Vat Purnima Vrat'} broadcom={'Home/Upcoming Festivals/Vat Purnima'} style={{ background: '#ff9c05' }} />

            <div className='marriage_contanier mt-5 mb-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 vatpage'>
                            <div className='upcoming-fest-container text-left'>
                                <h3>Vat <span>Purnima</span></h3>
                                <p>
                                    Vat Purnima Vrat or Vat Purnima is one of the most significant observances for Hindu women, especially the one who are married. The fast is observed on the day of Amavasya as well as Purnima.
                                    Vat Purnima Vrat is observed by the Hindu women who are married in the month of Jyeshtha during the Purnima Tithi according to Amanta calendar which is also popularly known as Vat Savitri Vrat. As per Hindu mythology, it is believed that the Vat (Banyan) tree stands for ‘Trimurtis’ which means representing Lord Vishnu, Lord Brahma, and Lord Shiva. Thus, the devotees get blessed with good fortune by worshipping the Banyan tree.
                                    The significance and glory of this fast are also mentioned in numerous scriptures and Puranas such as Skanda Purana, Bhavishyottara Purana, Mahabharata, etc.
                                    The fast and puja of Vat Purnima are performed by the Hindu married women so that their husbands get blessed with prosperity, good health, and longevity.
                                    The observance of the Vat Purnima Vrat is a token of devotion and true love by a married woman to her husband.
                                </p>

                                <h3>Puja Vidhi of <span>Vat Purnima</span></h3>
                                <p>Vat Purnima Vrat is similar to Vat Savitri Vrat. Married women observe Vat Purnima Vrat for well-being and long life of their husband. Most of the festivals.</p>
                                <h3>Astrological benefits of <span>vrats and pujas</span></h3>
                                <p>Vat Purnima Vrat is similar to Vat Savitri Vrat. Married women observe Vat Purnima Vrat for well-being and long life of their husband. Most of the festivals.</p>
                            </div>

                        </div>
                        <div className='col-md-6'>
                            {/* <VatCarousel /> */}
                            <div id="carouselExampleIndicators" className="carousel slide vatCarousel" data-ride="carousel">
                                <div className='container-fluid px-0'>
                                    <div className='topVatCarouselCard'>
                                        <div href="#carouselExampleIndicators" role="button" data-slide="prev">
                                            <img src={Prev} alt='prev' />
                                        </div>
                                        <div className='vatPurnimaTitle'>
                                            <h5>June 2023 Festivals & Vart</h5>
                                        </div>
                                        <div href="#carouselExampleIndicators" role="button" data-slide="next">
                                            <img src={Next} alt='next' />
                                        </div>
                                    </div>
                                </div>
                                <div className='container-fluid vatCarouselCard'>

                                    <div className="carousel-inner">

                                        <div className="carousel-item active">
                                            <div className='row  cardFest1 m-4'>
                                                <div className='col-md-6 col-6 '>
                                                    <img src={Vat1} alt='img' />
                                                </div>
                                                <div className='col-md-6 col-6 '>
                                                    <h5>Kalashtami</h5>
                                                    <p>Saturday, June 10-2023 Paksha : Krishna Tithi : Astami</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row  cardFest2'>
                                                <div className='col-md-6 col-6 '>
                                                    <img src={Vat1} alt='img' />
                                                </div>
                                                <div className='col-md-6 col-6 '>
                                                    <h5>Kalashtami</h5>
                                                    <p>Saturday, June 10-2023 Paksha : Krishna Tithi : Astami</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row  cardFest3'>
                                                <div className='col-md-6 col-6 '>
                                                    <img src={Vat1} alt='img' />
                                                </div>
                                                <div className='col-md-6 col-6 '>
                                                    <h5>Kalashtami</h5>
                                                    <p>Saturday, June 10-2023 Paksha : Krishna Tithi : Astami</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="carousel-item ">
                                            <div className='row  cardFest1 mt-4'>
                                                <div className='col-md-6 col-6 '>
                                                    <img src={Vat1} alt='img' />
                                                </div>
                                                <div className='col-md-6 col-6 '>
                                                    <h5>Kalashtami</h5>
                                                    <p>Saturday, June 10-2023 Paksha : Krishna Tithi : Astami</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row  cardFest2'>
                                                <div className='col-md-6 col-6 '>
                                                    <img src={Vat1} alt='img' />
                                                </div>
                                                <div className='col-md-6 col-6 '>
                                                    <h5>Kalashtami</h5>
                                                    <p>Saturday, June 10-2023 Paksha : Krishna Tithi : Astami</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row  cardFest3'>
                                                <div className='col-md-6 col-6 '>
                                                    <img src={Vat1} alt='img' />
                                                </div>
                                                <div className='col-md-6 col-6 '>
                                                    <h5>Kalashtami</h5>
                                                    <p>Saturday, June 10-2023 Paksha : Krishna Tithi : Astami</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="carousel-item ">
                                            <div className='row  cardFest1 mt-4'>
                                                <div className='col-md-6 col-6 '>
                                                    <img src={Vat1} alt='img' />
                                                </div>
                                                <div className='col-md-6 col-6 '>
                                                    <h5>Kalashtami</h5>
                                                    <p>Saturday, June 10-2023 Paksha : Krishna Tithi : Astami</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row  cardFest2'>
                                                <div className='col-md-6 col-6 '>
                                                    <img src={Vat1} alt='img' />
                                                </div>
                                                <div className='col-md-6 col-6 '>
                                                    <h5>Kalashtami</h5>
                                                    <p>Saturday, June 10-2023 Paksha : Krishna Tithi : Astami</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row  cardFest3'>
                                                <div className='col-md-6 col-6 '>
                                                    <img src={Vat1} alt='img' />
                                                </div>
                                                <div className='col-md-6 col-6 '>
                                                    <h5>Kalashtami</h5>
                                                    <p>Saturday, June 10-2023 Paksha : Krishna Tithi : Astami</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer history={props} />
        </>
    )
}

