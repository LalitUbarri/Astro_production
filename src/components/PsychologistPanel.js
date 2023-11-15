import React from 'react';
// import { SEO } from "../configuration/commonFunctions";
import user from '../images/user.svg';
import { FRONTEND_NAME } from '../configuration/constants';
const Header = React.lazy(() => import('../common/Header2'));
const Chat_Talk_Header = React.lazy(() => import('../common/Chat&Talk_Header'));
const PageBanner = React.lazy(() => import('../common/pageBanner'));
const Footer = React.lazy(() => import('../common/Footer'));
const Popup = React.lazy(() => import('./popupChat'));

function PsychologistPanel(props) {
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
                title={"Psychologist Panel"}
            />
            <PageBanner Banner={''} title={'Psychologist Panel'} broadcom={'Home/ psychologist-panel-astrology'} />
        </section>

        <section>
            <div className='point_container container'>
                <div className='points_body text-left mt-4 d-flex column-gap-30'>
                    <div className='point_content_PsychologistPanel text-justify'>
                        <p className="daily-horoscope-header text-left">
                            <span className="horoscope">{('What will be the benefits of Consultation on chat?')}</span>
                            {/* <span className="daily">{(' Points Reward?')} </span> */}
                        </p>
                        <p></p>
                        <p> Eu minim exercitation deserunt ad Lorem. Sunt culpa cupidatat laboris commodo enim velit sunt consectetur. In laborum dolor deserunt nostrud quis. Aliquip id aute tempor occaecat exercitation minim excepteur dolor ea. Ut aliqua adipisicing eiusmod ex amet occaecat est Lorem. Enim ea consequat et minim exercitation ullamco Lorem.</p>
                        <p> Eu minim exercitation deserunt ad Lorem. Sunt culpa cupidatat laboris commodo enim velit sunt consectetur. In laborum dolor deserunt nostrud quis. Aliquip id aute tempor occaecat exercitation minim excepteur dolor ea. Ut aliqua adipisicing eiusmod ex amet occaecat est Lorem. Enim ea consequat et minim exercitation ullamco Lorem.</p>

                        <p></p>
                        <p> Eu minim exercitation deserunt ad Lorem. Sunt culpa cupidatat laboris commodo enim velit sunt consectetur. In laborum dolor deserunt nostrud quis. Aliquip id aute tempor occaecat exercitation minim excepteur dolor ea. Ut aliqua adipisicing eiusmod ex amet occaecat est Lorem. Enim ea consequat et minim exercitation ullamco Lorem.</p>
                        <p> Eu minim exercitation deserunt ad Lorem. Sunt culpa cupidatat laboris commodo enim velit sunt consectetur. In laborum dolor deserunt nostrud quis. Aliquip id aute tempor occaecat exercitation minim excepteur dolor ea. Ut aliqua adipisicing eiusmod ex amet occaecat est Lorem. Enim ea consequat et minim exercitation ullamco Lorem.</p>

                        <p className="daily-horoscope-header text-left">
                            <span className="horoscope">{('What is Consultation?')}</span>
                            {/* <span className="daily">{(' Points Reward?')} </span> */}
                        </p>

                        <p> Eu minim exercitation deserunt ad Lorem. Sunt culpa cupidatat laboris commodo enim velit sunt consectetur. In laborum dolor deserunt nostrud quis. Aliquip id aute tempor occaecat exercitation minim excepteur dolor ea. Ut aliqua adipisicing eiusmod ex amet occaecat est Lorem. Enim ea consequat et minim exercitation ullamco Lorem.</p>
                        <p> Eu minim exercitation deserunt ad Lorem. Sunt culpa cupidatat laboris commodo enim velit sunt consectetur. In laborum dolor deserunt nostrud quis. Aliquip id aute tempor occaecat exercitation minim excepteur dolor ea. Ut aliqua adipisicing eiusmod ex amet occaecat est Lorem. Enim ea consequat et minim exercitation ullamco Lorem.</p>

                        <p className="daily-horoscope-header text-left">
                            <span className="horoscope">{('What is the duration of one session?')}</span>
                            {/* <span className="daily">{(' Points Reward?')} </span> */}
                        </p>

                        <p> Eu minim exercitation deserunt ad Lorem. Sunt culpa cupidatat laboris commodo enim velit sunt consectetur. In laborum dolor deserunt nostrud quis. Aliquip id aute tempor occaecat exercitation minim excepteur dolor ea. Ut aliqua adipisicing eiusmod ex amet occaecat est Lorem. Enim ea consequat et minim exercitation ullamco Lorem.</p>
                        <p> Eu minim exercitation deserunt ad Lorem. Sunt culpa cupidatat laboris commodo enim velit sunt consectetur. In laborum dolor deserunt nostrud quis. Aliquip id aute tempor occaecat exercitation minim excepteur dolor ea. Ut aliqua adipisicing eiusmod ex amet occaecat est Lorem. Enim ea consequat et minim exercitation ullamco Lorem.</p>
                       
                    </div>
                    <div className='point_card_container'>
                        <div className='point_card'>
                            <div className='point_card_header d-flex align-items-center justify-content-between'>
                                <span> Consultation on chat </span>
                                <span className='point_rate_card'> 4.87+ &#9733; </span>
                            </div>
                            <div className='point_card_body d-flex align-items-center justify-content-between'>
                                <div className='point_card_body_avatar'>
                                    <img src={user} alt="user profile" width={'100%'} />
                                </div>
                                <div className='point_card_body_content'>
                                    <strong> Astro Aparajita </strong>
                                    <p>Duration is 15 min</p>
                                    <p>₹400</p>
                                    <button className='btn BookNow_btn'> Book Now </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer history={props} />
    </>);
}

export default PsychologistPanel;