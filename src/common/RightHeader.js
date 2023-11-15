import React, { useEffect, useState } from 'react';
import TalkAstro from "../images/TalkAstro.svg";
import FreeSession from "../images/FreeSession.svg";
// import newsicon from "../images/news-icon.svg";
import ChatAstro from "../images/ChatAstro.svg";
import google from "../images/google.png";
import apple from "../images/apple.png";
import { useHistory } from 'react-router-dom'
import { FRONTEND_NAME } from "../configuration/constants";
import Signup from "../components/signup";
import '../styles/home.css'
import { useTranslation } from 'react-i18next';
import { getCommonHeaders, getStaticValues } from "../configuration/commonFunctions";
import apis from "../configuration/apis";
import axios from 'axios';
import urls from "../configuration/apiUrls";
import talkIcon from '../images/New-images/Group-4.png'
import chatIcon from '../images/New-images/Group.png'
import reportIcon from '../images/New-images/Vector.png'
import stoneIcon from '../images/New-images/Group-1.png'
// import $ from 'jquery';

// const isUserLoggedIn1 = localStorage.getItem('msisdn')
export default function RightHeader(props) {

  const history = useHistory();
  const [BottomHeaderData, setBottomHeaderData] = useState({
    isUserLoggedIn: localStorage["msisdn"] ? true : false,
    isChatActive: false,
    displaySignupPopUp: false,
    loginSelected: true,
  })
  //isFreeSession
  // console.log("Propsssss: ", props)

  const [isChatActive, setIsChatActive] = useState(false);
  const [activePandit, setActivePandit] = useState();

  const [t] = useTranslation();

  useEffect(() => {
    //fetchLiveChat();
    fetchPanditForChat();

    // console.log("console.log", props)
  }, []);

  const openChatList = () => {

    if (isChatActive) {
      history.push({
        pathname: FRONTEND_NAME + "/chat",
        state: { panditMsisdn: activePandit, data: '' }
      });
    }
    else {
      history.push({
        pathname: FRONTEND_NAME + "/chatList",
        state: { typeOfService: "Chat" },
      });
    }
  }

  const openLoginPopup = () => {
    setBottomHeaderData({
      ...BottomHeaderData,
      displaySignupPopUp: true,
      loginSelected: true,
    });
  };

  const openSignupPopup = () => {
    setBottomHeaderData({
      ...BottomHeaderData,
      displaySignupPopUp: true,
      loginSelected: false,
    });
  };

  const closeSignUpPopup = () => {
    setBottomHeaderData({
      ...BottomHeaderData,
      displaySignupPopUp: false,
    });
  };

  const closePopupOnLogin = () => {
    localStorage["isUserLoggedIn"] = true;
    setBottomHeaderData({
      ...BottomHeaderData,
      displaySignupPopUp: false,
      isUserLoggedIn: true,
    });
    history.push(FRONTEND_NAME + "/home");

  };

  const fetchLiveChat = () => {
    const headers = getCommonHeaders();
    let url = urls.getLiveChatData + localStorage['selectedCountryCode'] + localStorage['msisdn'];
    alert(url)

    fetch(url, {
      method: 'POST',
      headers: headers
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.code === 2000 && data.data) {
          console.log(data)
          setIsChatActive(true);
        }
      })
      .catch(error => {
        setIsChatActive(true);
        console.log(error)
      })
  }

  const fetchPanditForChat = () => {
    let url = urls.getLivePanditForUser;
    url = url.replace("<appName>", "astrology");
    url = url.replace("<userMsisdn>", Number(localStorage['selectedCountryCode'] + localStorage["msisdn"]));

    return apis.getLivePanditForUser(url).then((response) => {
      var data = response.data;

      if (data.code == "2000") {
        let chatClients = data.data;


        if (chatClients && chatClients.length > 0) {
          let panditMsisdn = chatClients[0].msisdn;
          setIsChatActive(true);
          setActivePandit(panditMsisdn);
          // history.push({
          //   pathname: FRONTEND_NAME + "/chat",
          //   state: {
          //     panditMsisdn: panditMsisdn
          // }})
        }
      }
      else {
        console.log(data.msg);
      }

    });
  };

  return <>

    {BottomHeaderData.displaySignupPopUp && (
      <Signup
        openLoginPopup={openLoginPopup}
        openSignupPopup={openSignupPopup}
        closePopUp={closeSignUpPopup}
        closeOnLogin={closePopupOnLogin}
        isLogin={BottomHeaderData.loginSelected}
        countryCode={props.countryCode}
      />
    )}
    <div className='right-header'>

    {props.isFreeSession && props.ourStaticData.map(item => {
          if (item.titleKey === "freeChatAndCallSession") {
            return (
              <div
                className="right-header-box talk_bg mob_480"
                onClick={
                  () => {
                    !BottomHeaderData.isUserLoggedIn ?
                      openLoginPopup() :
                      history.push(FRONTEND_NAME + "/freesession")
                  }
                }
              >
                
                  <div className='button_img_'>
                    <img src={item.imageUrl} alt="" width="32px" />
                  </div>
                <div className=''>
                  <div className="right-menu-text">
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                    </div>
                  
                </div>
                <div className="right-triangle mob_480"></div>
                
              </div>
            )
          }
        })}


        <div
          className={props.isFreeSession ? "right-header-box talk_bg":"right-header-box talk_bg padd_card"}
          onClick={() => history.push({
            pathname: FRONTEND_NAME + "/talk",
            state: { typeOfService: "Call" },
          })}>
          <div className='button_img_ talk_bg1'> 
            {props.ourStaticData.filter(a => a.titleKey === 'talkToAstrologer').map(a => <img src={talkIcon} alt="/" width="22px" />)}
          </div>
          <div className="right-menu-text"> {t('Talk_to_Astrologer')}</div>
          <div className='right-triangle mob_480'>
          </div>
        </div>

        <div
          className={props.isFreeSession ? isChatActive ? "right-header-box activeGreen":"right-header-box chat_bg":"right-header-box chat_bg padd_card" }
          onClick={() =>  openChatList()}>
          <div className='button_img_ chat_bg1'>
            {props.ourStaticData.filter(a => a.titleKey === 'chatWithAstrologer').map(a => <img src={chatIcon} alt="" width="32px" />)}
          </div>
          <div className="right-menu-text"> {t('Chat_with_Astrologer')}</div>
          <div className='right-triangle mob_480'>
          </div>
        </div>

        <div
          className={props.isFreeSession ? "right-header-box report_bg" :"right-header-box report_bg padd_card" }
          onClick={() => history.push({pathname: FRONTEND_NAME + "/report"})
            
          }
        >
          {/* <img src={FreeSession} alt="/" width="50px" />*/}
          <div className='button_img_ report_bg1'>
            {<img src={reportIcon} alt="/" width="32px" />}
          </div>
          <div className="right-menu-text">{t('Astrological Report')}</div>
          <div className='right-triangle mob_480'>
          </div>
        </div>

        <div
          className={props.isFreeSession ? "right-header-box stone_bg":"right-header-box stone_bg padd_card"}
          onClick={() => history.push({pathname: FRONTEND_NAME + "/astromall"})}
        >
          {/* <img src={FreeSession} alt="/" width="50px" />*/}
          <div className='img_container button_img_ stone_bg1'>
            {<img src={stoneIcon} alt="/" width="32px" />}
          </div>
          <div className="right-menu-text">{t('Gems & Stone')}</div>   
          <div className='right-triangle mob_480'>
          </div>
        </div>
    </div>
  </>
}