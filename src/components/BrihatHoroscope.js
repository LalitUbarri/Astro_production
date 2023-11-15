import React from 'react';
// import { SEO } from "../configuration/commonFunctions";
import KundaliForm from '../common/kundaliForm';
const Header = React.lazy(() => import('../common/Header2'));
const Chat_Talk_Header = React.lazy(() => import('../common/Chat&Talk_Header'));
const PageBanner = React.lazy(() => import('../common/pageBanner'));
const Footer = React.lazy(() => import('../common/Footer'));
const Popup = React.lazy(() => import('./popupChat'));

function BrihatHoroscope(props) {
    const [state, setState] = React.useState({
        displaySignupPopUp: false,
        loginSelected: false,
        isHeaderOpen: false,
        showPopUp: false,
        msg: '',
        isSuccess: '',
    });
    const { loginSelected, countryCode } = state
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

    const closePopUp = () => {
        setState({
            showPopUp: false,
            msg: ''
        });
    };

    return (<>
        <section>
            {/* <SEO
                keywords='Face Reading Astrology'
                title="Face Reading Astrology Insights | astroking"
                description="Unlock hidden insights with face reading astrology. Explore the power of astroking for accurate face analysis and predictions"
            /> */}
            {state.showPopUp && (
                <Popup
                    msg={state.msg}
                    isSuccess={state.isSuccess}
                    closePopUp={closePopUp}
                />
            )}
            <Header
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
                title={"Brihat Horoscope"}
            />
            <PageBanner Banner={''} title={'Brihat Horoscope'} broadcom={'Home/ brihat-horoscope-astrology'} />
        </section>

        <section>
            <div className='point_container container'>
                <div className='points_body text-left mt-4 d-flex column-gap-30'>
                    <div className='point_content_PsychologistPanel1 text-justify'>
                        <p className="daily-horoscope-header text-left">
                            <span className="horoscope">{('What is')}</span>
                            <span className="daily">{(' Brihat Horoscope?')} </span>
                        </p>
                        <p></p>
                        <p> Brihat Horoscope is the only horoscope model featuring all the 5 key areas of our life namely Career, Education, Finance, Health, & Family through the detailed exploration. It can be used as an ultimate guide to lead a content life. Brihat Horoscope is a kundli based 250 astrology report which offer detailed predictions about your life. Know auspicious muhurat, yogas and opportunities coming in your way. Detailed calculations – KP, KCIL, Cuspal Interlinks, 4-Step, Nakshatra Nadi, Jaimini, Lal Kitab Tewa & Debt etc.<strong> Available in Hindi and English</strong></p>


                        
                        <p className="daily-horoscope-header text-left">
                            {/* <span className="horoscope">{('What is the duration of one session?')}</span> */}
                            <span className="daily">{('Price ₹ 599')} </span>
                        </p>
                       
                    </div>
                    <div className='point_card_container1'>
                        <div className='point_card mt-4 mb-5'>
                           <KundaliForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer history={props} />
    </>);
}

export default BrihatHoroscope;