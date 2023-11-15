import React from 'react';
import banner from '../images/astro2-0/points-banner.png';

import { SEO } from "../configuration/commonFunctions";
import { FRONTEND_NAME } from '../configuration/constants';
const Header = React.lazy(() => import('../common/Header2'));
const Chat_Talk_Header = React.lazy(() => import('../common/Chat&Talk_Header'));
const PageBanner = React.lazy(() => import('../common/pageBanner'));
const Footer = React.lazy(() => import('../common/Footer'));
const Popup = React.lazy(() => import('./popupChat'));

function Points(props) {
    const [state, setState] = React.useState({
        displaySignupPopUp: false,
        loginSelected: false,
        isHeaderOpen: false,
        showPopUp:false,
        msg:'',
      isSuccess:'',
    });
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

  const closePopUp = () => {
        setState({
          showPopUp: false,
          msg:''
        });
      };

    return (<>
        <section>
            <SEO
                keywords='Face Reading Astrology'
                title="Face Reading Astrology Insights | astroking"
                description="Unlock hidden insights with face reading astrology. Explore the power of astroking for accurate face analysis and predictions"
            />
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
                title={"Loyalty Points"}
            />
            {/* <PageBanner Banner={''} title={'Loyalty Points'} broadcom={'Home/ loyalty-points'} /> */}
        </section>

        <section>
            <div className='point_container container'>
                <div className='point_content text-left mt-4'>
                    <img src={banner} alt='banner' width={'100%'} onClick={() => {
                        if(!state.loginSelected){
                            setState({
                                ...state,
                                showPopUp:true,
                                msg:'Please you have to login first then you will redirect the recharge page.',
                                isSuccess:''
                            })
                        } else props.history.push(FRONTEND_NAME + '/recharge') 
                        
                    }} />
                    <p className="daily-horoscope-header text-left">
                        <span className="horoscope">{('How To Get Loyalty')}</span>
                        <span className="daily">{(' Points Reward?')} </span>
                    </p>
                    <p></p>
                    <p> Eu minim exercitation deserunt ad Lorem. Sunt culpa cupidatat laboris commodo enim velit sunt consectetur. In laborum dolor deserunt nostrud quis. Aliquip id aute tempor occaecat exercitation minim excepteur dolor ea. Ut aliqua adipisicing eiusmod ex amet occaecat est Lorem. Enim ea consequat et minim exercitation ullamco Lorem.</p>
                    <p> Eu minim exercitation deserunt ad Lorem. Sunt culpa cupidatat laboris commodo enim velit sunt consectetur. In laborum dolor deserunt nostrud quis. Aliquip id aute tempor occaecat exercitation minim excepteur dolor ea. Ut aliqua adipisicing eiusmod ex amet occaecat est Lorem. Enim ea consequat et minim exercitation ullamco Lorem.</p>

                    <p className="daily-horoscope-header text-left">
                        <span className="horoscope">{('How To Redeem Loyalty')}</span>
                        <span className="daily">{(' Points Reward?')} </span>
                    </p>
                    <p></p>
                    <p> Eu minim exercitation deserunt ad Lorem. Sunt culpa cupidatat laboris commodo enim velit sunt consectetur. In laborum dolor deserunt nostrud quis. Aliquip id aute tempor occaecat exercitation minim excepteur dolor ea. Ut aliqua adipisicing eiusmod ex amet occaecat est Lorem. Enim ea consequat et minim exercitation ullamco Lorem.</p>
                    <p> Eu minim exercitation deserunt ad Lorem. Sunt culpa cupidatat laboris commodo enim velit sunt consectetur. In laborum dolor deserunt nostrud quis. Aliquip id aute tempor occaecat exercitation minim excepteur dolor ea. Ut aliqua adipisicing eiusmod ex amet occaecat est Lorem. Enim ea consequat et minim exercitation ullamco Lorem.</p>
                </div>
            </div>
        </section>
        <Footer history={props} />
    </>);
}

export default Points;