import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import SockJsClient from 'react-stomp';
//import SockJS from 'sockjs-client';
//import Stomp from 'stompjs';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
import "../styles/login.css";
import Header from "../common/Header2";
// import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
import checkmark from "../images/checkmark-outline.svg";
import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
import user from "../images/user.svg";
import smile from "../images/smile.png";
// import attach from "../images/attach.svg";
import { APP_NAME, CHAT_API_URL, FRONTEND_NAME, ROLE_CLIENT } from "../configuration/constants";
// import * as Constant from "../configuration/constants";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import apiUrls from "../configuration/apiUrls";
import apis from "../configuration/apis";
// import { getApi } from "../configuration/apis";

import { getCommonHeaders } from "../configuration/commonFunctions";
// import { SUCCESS_CODE } from "../configuration/errorConstants";
import Popup from "./popupChat";
import Popup2 from "./Popup2";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Picker from "emoji-picker-react";
import StarRatingComponent from "react-star-rating-component";
import $ from "jquery";
// import BottomHeader from "../common/BottomHeader";


import { useTranslation } from "react-i18next";
import Chat_Talk_Header from "../common/Chat&Talk_Header";

//const socket = SockJS(CHAT_API_URL + "/" + APP_NAME);
//const wsocket = Stomp.over(socket);

function SocketChat(props) {

  const containerRef = useRef(null);
  const [t] = useTranslation();
  // alert(JSON.stringify(props.location.state.orderDetail))
  // var userProfile = JSON.parse(localStorage.getItem("userProfile"));
  var ddd = localStorage["chatFrom"] !== undefined ? JSON.parse(localStorage["chatFrom"]) : '';
  const [chatEndMsg, setchatEndMsg] = useState("");
  const [chatId, setchatId] = useState(sessionStorage["chatId"] ? sessionStorage["chatId"] : "");
  const [oldChats, setoldChats] = useState([]);
  const [userMsisdn, setuserMsisdn] = useState(localStorage["chatFrom"] !== undefined ? ddd[0].userMsisdn : '');
  const [panditMsisdn, setpanditMsisdn] = useState(localStorage["chatFrom"] !== undefined ? ddd[0].panditMsisdn : "")
  const [isPremium, setIsPremium] = useState(props.location.state
    ? (props.location.state.isPremium ? props.location.state.isPremium : false)
    : false)

  // console.log(ddd[0]);
  const [orderDetail] = useState(props.location.state ? props.location.state.orderDetail
    : "")
  const [notifyPanditMsisdn, setnotifyPanditMsisdn] = useState("")
  // const [reviewerName, setreviewerName] = useState('')
  const [reviewerName, setreviewerName] = useState(localStorage["chatFrom"] !== undefined ? ddd[0].fname + ddd[0].lname : '')
  // const [reviewerName, setreviewerName] = useState(localStorage["profileData"] ? JSON.parse(localStorage["profileData"]).find((item) => item.fieldColumnName == "first_name").fieldValue : "" + localStorage["profileData"] ? JSON.parse(localStorage["profileData"]).find((item) => item.fieldColumnName == "last_name").fieldValue : localStorage["profileData"])
  const [inputMessage, setinputMessage] = useState("");
  const [newChats, setnewChats] = useState([]);
  const [userAvailable, setuserAvailable] = useState(false)
  const [chatEnded, setchatEnded] = useState(false);
  const [showPopUp, setshowPopUp] = useState(false);
  const [msg, setmsg] = useState("")
  const [isSuccess, setisSuccess] = useState(false)
  const [displayEmoji, setdisplayEmoji] = useState(false)
  const [panditPic, setpanditPic] = useState("")
  const [rating, setrating] = useState("")
  const [review, setreview] = useState("")
  const [showReview, setshowReview] = useState(false)
  const [isSocketConnected, setisSocketConnected] = useState(false);
  const [clientRef, setclientRef] = useState("")
  const [onMsg, setOnMsg] = useState(false);
  const [Routemsg, setRoute] = useState('');


  // useEffect(() => {
  //   // const webSoc = ws;
  //   // ws.connect({}, () => {
  //   //   ws.subscribe('/topic/requests/' + APP_NAME + "/" + userMsisdn, (msg) => {
  //   //     console.log("subscribe scenerio");
  //   //     onMessageReceive(msg);
  //   //   });
  //   //   webSoc.onmessage = (e) => {
  //   //   onMessageReceive(e.data);
  //   //   };
  //   // },
  //   //   () => {
  //   //     console.log("Could not connect you to the Chat. Please refresh this page and try again!");
  //   //   });
  //   // getUserProfileDetails();
  // }, [])

  useEffect(() => {
    if (Object.keys(oldChats).length === 2) {
      localStorage['msg_recevied'] = true;
      setOnMsg(true);
    }
  }, [oldChats])


  useEffect(() => {
    const el = document.getElementById('sokit_container');
    // alert(el)
    if (el) {
      el.scroll({
        top: el.scrollHeight,
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [containerRef, newChats, oldChats]);

  // const getUserProfileDetails = () => {
  //   // var url = Constant.ASTRO_URL + Constant.GET_USER_PROFILE_DETAILS + "/91" + this.state.userName;
  //   var url = Constant.ASTRO_URL + Constant.GET_USER_PROFILE_DETAILS;
  //   const headers = getCommonHeaders();
  //   headers.msisdn = localStorage['selectedCountryCode'] + localStorage['msisdn'];
  //   // alert(JSON.stringify(headers));
  //   getApi(url, headers)
  //     .then((response) => response.data)
  //     .then((data) => {
  //       console.log(data);
  //       if (data && data.code == SUCCESS_CODE) {
  //         // alert(JSON.stringify(data.data));
  //         localStorage["profileData"] = JSON.stringify(
  //           data.data.profileDataList
  //         );
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("error", error);
  //     });
  // };

  const submitMessage = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      if (localStorage['msg_recevied'] === undefined || localStorage['msg_recevied'] === true) {
        showPopUpFun("you are in the queue! Astrologer's first reply is awaited. You will not be charged till then.", false);
      } else sendSocketMsg(chatId, inputMessage, false)
    }
  };

  const setMessage = (event) => {
    console.log("event.target.value", event.target.value);
    let inputMsg = event.target.value;

    setinputMessage(inputMsg);
  };

  const sendSocketMsg = (chatId, msg, isFirstMessage) => {
    if (!msg)
      return;

    let requestBody = {
      'from': userMsisdn,
      'to': panditMsisdn,
      'message': msg,
      'appName': APP_NAME,
      'chatId': chatId,
      'userRole': ROLE_CLIENT,
      'isFirstMessage': isFirstMessage
    };
    localStorage['route'] = 'chat'
    localStorage['chatId'] = sessionStorage["chatId"];
    localStorage['userMsisdn'] = userMsisdn;
    localStorage['reviewerName'] = reviewerName;

    clientRef.sendMessage("/chatapp/message/send", JSON.stringify(requestBody));

    setdisplayEmoji(false);
    setchatId(chatId);
    //  setpanditPic(data.data.profilePicUrl);
    setuserAvailable(true);
    setinputMessage("");
  }

  const startConversation = () => {

    let url = apiUrls.startConversationV2;
    url = url.replace("<appName>", APP_NAME.replace(/['"]+/g, ""));
    url = url.replace("<userMsisdn>", Number(userMsisdn));
    url = url.replace("<panditMsisdn>", Number(panditMsisdn));
    url = url.replace("<Language>", "en");
    url = url.replace("<isPremium>", isPremium);
    url = url.replace("<isPromotional>", localStorage['freeSession'] === true ? true : false);

    if (orderDetail && orderDetail.subsidizedCampaignId)
      url += "&subsidizedCampaignId=" + orderDetail.subsidizedCampaignId;
    // alert(orderDetail.subsidizedCampaignId);
    var headers = getCommonHeaders();
    console.log("url main", url);
    apis
      .startConversationV2(url, {}, { headers })
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          sessionStorage["chatId"] = data.data.chatId;
          setTimeout(() => {
            let { secondMessage } = data.data;
            let requestBody2 = {
              'from': panditMsisdn,
              'to': userMsisdn,
              'message': secondMessage ? secondMessage : 'Dear user, I have received your details, allow me to generate your Kundali. Please wait for a few minutes.',
              'appName': APP_NAME,
              'chatId': '73egrhjas76e8q4yge8286',
              'userRole': ROLE_CLIENT,
              'isFirstMessage': true,
              'messageTime': Date()
            };
            setnewChats(newChats => [...newChats, requestBody2]);
          }, 3000);
          sendSocketMsg(data.data.chatId, data.data.message, true);

        } else {
          if (data.msg === 'User is not on chat.') {
            props.history.push(FRONTEND_NAME + '/home')
          }
          console.log(data.msg);
          setchatEndMsg('recharge');
          showPopUpFun("You've used up your free campaign, please recharge your account to talk and chat with astrologer.", false);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const endConversation = () => {
    let url = apiUrls.endChat;
    $('#exampleModalCenter').modal('hide')
    url = url.replace("<appName>", APP_NAME.replace(/['"]+/g, ""));
    url = url.replace("<userMsisdn>", Number(userMsisdn));
    url = url.replace("<panditMsisdn>", Number(panditMsisdn));
    url = url.replace("<chatId>", chatId.replace(/['"]+/g, ""));

    var headers = getCommonHeaders();
    console.log("url main", url);
    apis
      .endChat(url, { headers })
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          delete sessionStorage["chatId"];
          showPopUpFun(t("Hope, We have made your Day!!"), false);
          console.log("Chat ended.");
          setchatEnded(true);
          localStorage.removeItem('chatFrom');
          localStorage.removeItem('msg_recevied');
          setshowReview(true)
          window.location.href = '#reviwform'
          if (!onMsg) {
            localStorage['route'] = 'chatList'
            setRoute('chatList');
            setshowReview(false);
          } else setshowReview(true);

          setdisplayEmoji(false);
        } else {
          console.log(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const getOldChat = (chatId) => {
    let url = apiUrls.getChat;
    url = url.replace("<appName>", APP_NAME.replace(/['"]+/g, ""));
    url = url.replace("<chatId>", chatId.replace(/['"]+/g, ""));
    url = url.replace("<userMsisdn>", Number(userMsisdn));
    url = url.replace("<panditMsisdn>", Number(panditMsisdn));

    return apis.getChat(url).then((response) => {
      var data = response.data;

      if (data.code == 2000) {
        let oldChat = data.data;
        console.log("response getOldChat ", oldChat);
        if (oldChat) {
          setoldChats(oldChat);

        }

      } else {
        console.log("ERROR", data.msg);
      }
    });
  };

  const onMessageReceive = (message) => {
    console.log("msg recieved ");
    console.log("msg is.................................. ");
    console.log("incomingMessage", message);
    console.log("incomingMessage", message.userRole);
    localStorage['route'] = 'chat'
    if (!message.chatEnd) {
      setnewChats(newChats => [...newChats, message]);
    }
    else {
      delete sessionStorage["chatId"];
      setchatEnded(true);
      setshowReview(true);
      setdisplayEmoji(false);

    }
    if (message.userRole === 'ROLE_PANDIT') {
      localStorage['msg_recevied'] = true;
      setOnMsg(true);
    } else if (!onMsg) {
      localStorage['route'] = 'chat'
      setRoute('chat');
    }

  }
  const closePopUpFun1 = () => {
    // alert(Routemsg)
    setshowPopUp(false);
    var url = typeof localStorage['route'] === 'undefined' ? 'home' : localStorage['route'];
    props.history.push({
      pathname: FRONTEND_NAME + `/${url}`,
      state: { typeOfService: "Chat" },
    });

  };
  const closePopUpFun = () => {
    // alert(Routemsg)
    setshowPopUp(false);
  };

  const onEmojiClick = (event, emojiObject) => {
    setinputMessage(inputMessage => inputMessage + emojiObject.emoji);
  };

  const showEmoji = () => {
    if (displayEmoji) {
      setdisplayEmoji(false);
    } else {
      setdisplayEmoji(true);
    }
  };

  const onStarClick = (nextValue, prevValue, name) => {
    // this.setState({ rating: nextValue });
    setrating(nextValue);

  };

  const reviewSubmit = () => {
    //alert(`review ${this.state.review} rating ${this.state.rating}`);
    let url = apiUrls.submitChatReview;

    if (!rating) {
      showPopUpFun(t("Please enter the required fields"), false);
      return;
    }

    let body = {
      productId: localStorage['userMsisdn'],
      rating: rating,
      review: review,
      reviewerName: localStorage['reviewerName'],
      chatTxnId: localStorage['chatId']
    };
    return apis.submitChatReview(url, body).then((response) => {
      var data = response.data;

      if (data.code == 2000) {

        setshowReview(false);
        props.history.push({
          pathname: FRONTEND_NAME + "/chatList",
          state: { typeOfService: "Chat" },
        });
        localStorage.removeItem('chatFrom');
        localStorage.removeItem('route')
        localStorage.removeItem('chatId');
        localStorage.removeItem('userMsisdn');
        localStorage.removeItem('reviewerName');
      } else {
        console.log("ERROR", data.msg);
      }
    });
  };
  const updateReview = (evt) => {

    setreview(evt.target.value);
  };

  const showPopUpFun = (msg, isSuccess) => {
    setmsg(msg);
    setisSuccess(isSuccess);
    setshowPopUp(true);
  }


  return (
    <>
      <Popup2 chatEndHandle={endConversation} />
      {showPopUp && (
        <Popup
          msg={msg}
          isSuccess={isSuccess}
          closePopUp={!onMsg ? closePopUpFun1 : closePopUpFun}
          chatEnded={chatEnded}
          type={chatEndMsg}
          alert_panditMsg={onMsg === false ? "pandit not reply" : ""}
        />
      )}

      <SockJsClient url={CHAT_API_URL + "/" + APP_NAME}
        topics={['/topic/requests/' + APP_NAME + "/" + userMsisdn]}
        ref={(client) => {
          setclientRef(client);
        }}
        onConnect={() => {
          console.log("connected socket");
          // this.startConversation();

          if (!chatId) {
            console.log("call start convo");
            startConversation();
          } else {

            getOldChat(chatId);
            setuserAvailable(true);
          }
          setisSocketConnected(true);


        }}
        onDisconnect={() => {
          console.log("Disconnected");

          setisSocketConnected(false);
        }}
        onMessage={onMessageReceive}

        debug={true}
      />
      <Chat_Talk_Header
        IsNavIconTrue={false}
        IsSearchTrue={false}
        IsFilterTrue={false}
        // editSearchTerm={this.editSearchTerm}
        // editSortTerm={this.editSortTerm}
        // IsMob_Side_Nave={this.IsMob_Side_Nave}
        propsData={props}
        IsTitleTrue={true}
        CustomClass={true}
        title={`${t('Chat_')} ${t('Astrologer_')}`}
      />
      <Header
        IsActive_header_Or_not="chat_and_talk_header-"
      />

      {/* <BottomHeader /> */}
      <div className="container mb-5" id="chat-container">

        {/* <HeaderMenu /> */}
        <PageHeader
          Mob_HeaderIsTrue={'not_show_mob_header1'}
          name={{ firstname: "CHAT", lastname: "WITH ASTROLOGER" }} />

        <div className="page-body chat_socket_body d-flex justify-content-between" style={{ marginLeft: '-17px' }}>
          <div className="show-l chat_mob chat-nav_">
            <SideMenu />
          </div>
          <div className={userAvailable ? "bg-chat chatSocket_container" : 'col bg-chat d-flex align-items-center justify-content-center'}>
            <div className="chatinner_container">
              <div className="chatSocket_msg_recevied" id="sokit_container">
                {userAvailable ? (
                  <>
                    <div style={{ overflow: "hidden", marginBottom: "15px" }}>
                      <p
                        className="today-day today-top"
                        style={{ float: "left", width: "calc(100% - 70px)" }}
                      >
                        {t('Today')}
                      </p>
                      <span style={{ float: "right", marginTop: "10px" }}>
                        <button
                          className="endBtn_for_chat"
                          onClick={() => {
                            $('#exampleModalCenter').modal('show')
                          }}
                        >
                          {t("End")}
                        </button>

                      </span>
                    </div>

                    <div class="user-chat" style={{ marginBottom: "75px" }}>
                      {oldChats &&
                        oldChats.length > 0 &&
                        oldChats.map((item, index) => (
                          <div class="">
                            <div class="msg">
                              <p
                                className={
                                  item.from == userMsisdn
                                    ? "msg-sent"
                                    : "msg-recived"
                                }
                              >
                                {item.from == panditMsisdn ? (
                                  <span className="chat-img-n">
                                    <img
                                      alt="pandit"
                                      src={
                                        panditPic
                                          ? panditPic
                                          : user
                                      }
                                    ></img>
                                  </span>
                                ) : (
                                  ""
                                )}
                                <span>{item.message}</span>
                              </p>
                            </div>
                            <p
                              className={
                                item.from == userMsisdn
                                  ? "msg-sent-status"
                                  : "msg-recived-status"
                              }
                            >
                              <span
                                class={
                                  item.from == panditMsisdn
                                    ? "seen-received"
                                    : "seen"
                                }
                              >
                                {moment(new Date(item.messageTime)).format("LT")}
                              </span>
                              {item.from == userMsisdn && (
                                <img src={checkmark} className="check-img" alt="img" />
                              )}
                            </p>
                          </div>
                        ))}

                      {/* NEW PANDITJI MESSAGES */}

                      {newChats &&
                        newChats.length > 0 &&
                        newChats.map((item, index) => {
                          // alert(Object.keys(oldChats).length)

                          return (
                            <div class="">
                              <div class="msg">
                                <p
                                  className={
                                    item.from == userMsisdn
                                      ? "msg-sent"
                                      : "msg-recived"
                                  }
                                >
                                  {item.from == panditMsisdn ? (
                                    <span className="chat-img-n">
                                      <img
                                        alt="pandit"
                                        src={
                                          panditPic
                                            ? panditPic
                                            : user
                                        }
                                      ></img>
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  <span>{item.message}</span>
                                </p>
                              </div>
                              <p
                                className={
                                  item.from == userMsisdn
                                    ? "msg-sent-status"
                                    : "msg-recived-status"
                                }
                              >
                                <span
                                  class={
                                    item.senderId == panditMsisdn
                                      ? "seen-received"
                                      : "seen"
                                  }
                                >
                                  {moment(new Date(item.messageTime)).format("LT")}
                                </span>
                                {item.from == userMsisdn && (
                                  <img src={checkmark} className="check-img" alt="img" />
                                )}
                              </p>
                            </div>
                          )
                        })}
                    </div>
                    {showReview && (
                      <div className="feedback-div" id="reviwform">
                        <p className="your-review">{t("Your review")}</p>
                        <StarRatingComponent
                          name="rate"
                          value={rating}
                          starCount="5"
                          className="star-rating"
                          starColor="#FF9C05"
                          emptyStarColor="#828282"
                          onStarClick={onStarClick.bind(this)}
                        />
                        <textarea
                          placeholder={t("Write your review here….")}
                          maxLength="160"
                          value={review}
                          onChange={updateReview}
                        ></textarea>
                        <p className="f-length">
                          {review.length > 0
                            ? review.length
                            : 0}
                          /160
                        </p>
                        <button onClick={reviewSubmit}>{t('Submit')}</button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="fetch_err_container chatSocket_container d-flex align-items-center justify-content-center">
                    <p className="text-center no-data">{t('Fetching chat request…')}</p>
                  </div>
                )}
              </div>
              {/* <ReactTimerStopwatch
                isOn={true}
                fromTime={this.state.chatTime}
                displayHours={false}
                className="react-stopwatch-timer__table"
                watchType="stopwatch"
              /> */}
            </div>
            <div className="bottom-send-chat">

              <input
                id="typemessage"
                type="text"
                placeholder={t("Type a message")}
                onChange={setMessage}
                value={inputMessage}
                onKeyPress={submitMessage}
                disabled={chatEnded}
              ></input>
              <img src={smile} onClick={showEmoji} alt="img"></img>

              <button
                class="msg_send_btn btn"
                // type="submit"
                onClick={() => {
                  // alert(localStorage['msg_recevied'])
                  if (localStorage['msg_recevied'] === undefined || localStorage['msg_recevied'] === true) {
                    showPopUpFun("you are in the queue! Astrologer's first reply is awaited. You will not be charged till then.", false);
                  } else sendSocketMsg(chatId, inputMessage, false)
                }}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
              {displayEmoji ? (
                <Picker
                  onEmojiClick={onEmojiClick}
                />
              ) : (
                ""
              )}

            </div>

          </div>
        </div>
      </div>
      <div className="mob_480">
        <Footer history={props} />
      </div>

    </>
  );

}


export default withRouter(SocketChat);
