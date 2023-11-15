import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import createFocusTrap from 'focus-trap';
import ChatMessage from "../chat_Message";
import "./chat_window.css";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import moment from "moment";
import Picker from "emoji-picker-react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from 'react-router-dom'
import Popup from "../../popupChat";
import { FirstMessage, secondMessage, FRONTEND_NAME, ASTRO_URL, GET_ORDER_WHITE_GOODS } from '../../../configuration/constants';
import { getCommonHeaders } from '../../../configuration/commonFunctions';
import { postApi } from "../../../configuration/apis";
import * as ErrorConstant from "../../../configuration/errorConstants";
import Popup2 from "../../Popup2";
import $ from 'jquery'
import ReviewPopup from "../chat_window/reviewPopup";
import  secureLocalStorage  from  "react-secure-storage";


const ChatWindow = ({ isOpen, position, props }) => {
    const { t } = props;
    const location = useLocation();
    const chatWindow = useRef();
    const chatWindowBody = useRef();
    const userInput = useRef();
    var ddd = secureLocalStorage.getItem("chatFrom") !== undefined ? JSON.parse(secureLocalStorage.getItem("chatFrom")) : '';
    const [message, setValue] = useState("");
    const [displayEmoji, setdisplayEmoji] = useState(false)
    const [focusTrap, setFocusTrap] = useState(null);
    const [ipAddress, setIpAddress] = useState(null);
    const [showPopUp, setshowPopUp] = useState(false);
    const [msg, setmsg] = useState("")
    const [isSuccess, setisSuccess] = useState(false)
    const [chatEnded, setchatEnded] = useState(false);
    const [chatEndMsg, setchatEndMsg] = useState();
    const [onMsg, setOnMsg] = useState(false);
    const [userMsisdn, setuserMsisdn] = useState(secureLocalStorage.getItem("chatFrom") !== null ? ddd[0].userMsisdn : '');
    const [panditMsisdn, setpanditMsisdn] = useState(secureLocalStorage.getItem("chatFrom") !== null ? ddd[0].panditMsisdn : "")
    const [socketUrl, setSocketUrl] = useState(`ws://localhost:3000/ws/${userMsisdn}/${panditMsisdn}`);
    const [messageHistory, setMessageHistory] = useState([]);

    const Options = {
        shouldReconnect: false,
    };
    
    const { sendMessage, lastMessage, readyState, sendJsonMessage, getWebSocket } = useWebSocket(socketUrl, Options,);
    const [customReadyState, setCustomReadyState] = useState(readyState);

    const [messages, setMessages] = useState([]);

    // const [isPremium, setIsPremium] = useState(props.location.state
    //   ? (props.location.state.isPremium ? props.location.state.isPremium : false)
    //   : false)


    var subsidizeTime = 60000 * 5;

    // console.log(ddd[0].orderDetail);
    // console.log(ddd[0].orderDetail.subsidizedCampaignId);
    


    var df =  secureLocalStorage.getItem('data') && typeof secureLocalStorage.getItem('data') !== undefined ? JSON.parse(secureLocalStorage.getItem('data')):[];


    const Chat_rate = secureLocalStorage.getItem("chatFrom") !== null ? ddd[0].orderDetail.goodsPrice :'';
    const user_balance = localStorage.getItem('userBalance');
    var Chat_DurationTime = (user_balance / Chat_rate) * 60 * 1000;

    const chat_startTime = secureLocalStorage.getItem('startTime');

    // console.log(Chat_DurationTime);
    // console.log(chat_startTime);

    useEffect(() => {
        if (lastMessage !== null) {
            var lastMsg = JSON.parse(lastMessage.data);
            setMessageHistory((prev) => prev.concat(
                lastMessage.constructor.name === Object ?
                    JSON.parse(lastMessage.split('|')[0]).body :
                    { message: lastMsg.body, from: userMsisdn, to: panditMsisdn, dateTimeStamp: lastMsg.timestamp, state: 1, originIpAddress: 'pandit ji' }
            ));

            setMessages([
                ...messages,
                { message: lastMsg.body, from: userMsisdn, to: panditMsisdn, dateTimeStamp:(lastMsg.timestamp * 1000), state: 1, originIpAddress: 'pandit ji' }
            ])
            console.log(lastMessage)
            secureLocalStorage.setItem('data', JSON.stringify([
                ...Array.from(JSON.parse(secureLocalStorage.getItem('data'))),
                { message: lastMsg.body, from: userMsisdn, to: panditMsisdn, dateTimeStamp:(lastMsg.timestamp * 1000), state: 1, originIpAddress: 'pandit ji' }
            ]))

             secureLocalStorage.getItem('startTime') ?? secureLocalStorage.setItem('startTime', (lastMsg.timestamp * 1000));
            //  localStorage.getItem('startTime') ?? localStorage.setItem('startTime', (lastMsg.timestamp * 1000));

            var d22 = (panditMsisdn+userMsisdn)
            secureLocalStorage.setItem('chatKey',d22)

            calculateuserChatDeduction(secureLocalStorage.getItem('startTime') ?? secureLocalStorage.setItem('startTime', (lastMsg.timestamp * 1000)), df.pop().dateTimeStamp);
        }

    }, [lastMessage]);
  

    function calculateuserChatDeduction(chatStartTime, chatEndTime) {
        // minutes to go (countdown)
        // console.log(chatStartTime);
        // console.log(chatEndTime);
        const t = (chatEndTime - chatStartTime);
        console.log("startmessage timeStamp : " ,t);

        if(Chat_DurationTime < t){
            showPopUpFun("Your chat has been ended due to insufficient balance in your wallet ", false);
            ChatEnded()
        }

        return t;
    }

    function calculateBalanceDeduction(chatStartTime, chatEndTime, chatRate) {
        const t = (Date.parse(chatEndTime) - Date.parse(chatStartTime)) / (60000 * chatRate);
        console.log(t);
        return t;
        // const startTimeArray = chatStartTime ? chatStartTime.split(":") :'';
        // const endTimeArray = chatEndTime.split(":");
        // const startMinutes = parseInt(startTimeArray[0]) * 60 + parseInt(startTimeArray[1]);
        // const endMinutes = parseInt(endTimeArray[0]) * 60 + parseInt(endTimeArray[1]);

        // // chat duration in minutes
        // const chatDuration = endMinutes - startMinutes;
        // console.log("chat Duration : " + chatDuration);
        // // chat balance deduction
        // const balanceDeduction = chatDuration * chatRate;
        // return balanceDeduction;
    }

    const ChatEnded = () => {
        if (lastMessage !== null) {
            var endTime = df.pop().dateTimeStamp;
            $('#exampleModalCenter').modal('hide')
            secureLocalStorage.removeItem('chatKey')
            secureLocalStorage.removeItem('data')
            secureLocalStorage.removeItem('chatFrom');
            secureLocalStorage.removeItem('route');
            secureLocalStorage.removeItem('startTime');
            // alert(
            //     'Start TIMESTAMP: ' +
            //     chat_startTime +
            //     ', END TIMESTAMP: ' +
            //     endTime +
            //     'COST: ' +
            //     (endTime - chat_startTime) * Chat_rate / 60000
            // );
            getWebSocket().close();
            // var deduction = ((endTime - chat_startTime)/ 60000 * Chat_rate ).toFixed(2);
            var deduction = (Math.ceil((endTime - chat_startTime) / 60000.0) * Chat_rate).toFixed(2);
            console.log(endTime - chat_startTime);
            console.log((endTime - chat_startTime) /60000);
            console.log((endTime - chat_startTime) /60000 * Chat_rate);
            console.log(((endTime - chat_startTime) /60000 * Chat_rate).toFixed(2));
            console.log(Chat_rate);
            var url = ASTRO_URL + GET_ORDER_WHITE_GOODS;
            const headers = getCommonHeaders();
            const body = {
                address: {
                    addressLine1: '',
                    addressLine2: '',
                    city: '',
                    country: '',
                    deliveryMobileNo: localStorage['msisdn'],
                    deliveryName: '',
                    houseNo: '',
                    pinCode: '',
                    state: ''
                },
                isQuantityCheck: "0",
                isSelfPaytm: "0",
                paytmNumber: "0",
                products: [
                    {
                        "redeemParentCategory": "whiteGoods",
                        "redeemCategory": "Chat",
                        "redeemMode": "",
                        "redeemPoint": deduction,
                        "redeemValue": Chat_rate,
                        "redeemUnit": ((endTime - chat_startTime) /60000).toFixed(),
                        "redeemId": 278,
                        "imageUrl": "https://astroking.com/FlexImages/1_Mall_Rudrakash Mala.jpg",
                        "goodsNameKey": "RudrakashMala",
                        "whiteGoodsDetails": {
                            "goodsId": 278,
                            "clientId": "ASTRO_20200825",
                            "campaignId": 1,
                            "goodsCategory": "Course",
                            "goodsNameKey": "RudrakashMala",
                            "goodsName": "Rudrakash Mala",
                            "goodsPrice": Chat_rate,
                            "goodsPoints": deduction,
                            "goodsQuantity": ((endTime - chat_startTime) /60000).toFixed(),
                            "goodsDescription": "Rudrakh mala ke dwara aap mantro ka jaap kare.",
                            "goodsDescriptionhindi": null,
                            "goodsShortDescription": null,
                            "goodsShortDescriptionhindi": null,
                            "goodsBrief": "Free Delivery",
                            "goodsDeliveryTime": "7 days",
                            "goodsImage": "https://astroking.com/FlexImages/1_Mall_Rudrakash Mala.jpg",
                            "goodsVideo": null,
                            "language": "en",
                            "sequence": "1",
                            "whiteGoodImages": [],
                            "updateTimestamp": "2021-06-15T13:18:04.000+0000",
                            "redeemFlag": false,
                            "appLanguage": "en",
                            "payoutPercent": null,
                            "isPremium": 0,
                            "premiumPrice": null,
                            "goodsPriceUSD": "0.0",
                            "goodsNameHindi": null,
                            "poojaUrl": null,
                            "panditName": null,
                            "participants": null,
                            "bestTime": null,
                            "preparationAndIntegration": null,
                            "isOffline": null
                        }
                    }
                ],
                redemptionAddress: "",
                totalRedeemPoints: deduction,
                voucher_transaction_id: ''
            };

            postApi(url, headers, body)
                .then((response) => response.data)
                .then((data) => {
                    if (data && data.code == ErrorConstant.SUCCESS_CODE) {
                        console.log(data);
                        $('#Reviewpopup').modal('show')
                    }
                }).catch((error) => {
                    console.error("error", error);
                });
        } else {
            secureLocalStorage.removeItem('chatKey')
            secureLocalStorage.removeItem('data')
            secureLocalStorage.removeItem('chatFrom');
            secureLocalStorage.removeItem('route');
            secureLocalStorage.removeItem('startTime');
            $('#exampleModalCenter').modal('hide')
            props.history.push({
                pathname: FRONTEND_NAME + "/chatList",
                state: { typeOfService: "Chat" },
            });
            getWebSocket().close();
        }
    }

    const onEmojiClick = (event, emojiObject) => {
        setValue(inputMessage => inputMessage + emojiObject.emoji);
    };

    const handleDisconnectClick = React.useCallback(() => {
        if (readyState === ReadyState.OPEN) {
            getWebSocket().close(1000);
            setCustomReadyState(ReadyState.CLOSED)
        }
    }, [readyState, sendJsonMessage]);


    function join(date, options, separator) {
        function format(option) {
            let formatter = new Intl.DateTimeFormat('en', option);
            return formatter.format(date);
        }
        return options.map(format).join(separator);
    }
    let options = [{ day: 'numeric' }, { month: 'short' }, { year: 'numeric' }];

    useEffect(() => {
        var chatKey = secureLocalStorage.getItem('chatKey');
        // alert(chatKey)
        if(chatKey === null){
            var fmsg = FirstMessage;
            fmsg = fmsg.replace('<name>', location.state.data.fname);
            fmsg = fmsg.replace('<gender>', location.state.data.gender);
            fmsg = fmsg.replace('<dob>', join(location.state.data.dob, options, '-'));
            fmsg = fmsg.replace('<tob>', moment(location.state.data.timeofbirth).format('hh:mm a'));
            fmsg = fmsg.replace('<pob>', location.state.data.placeofbirth);
            const FirstMessageBody = {
                from: userMsisdn,
                to: panditMsisdn,
                body: fmsg,
                state: 0,
                timestamp: Date.now()
            }
            handleClickSendMessage(FirstMessageBody)
            setMessages([
                ...messages,
                { message: FirstMessageBody.body, from: userMsisdn, to: panditMsisdn, dateTimeStamp: Date.now(), state: 0 },
                { message: secondMessage, from: userMsisdn, to: panditMsisdn, dateTimeStamp: Date.now(), state: 1, originIpAddress: 'pandit ji' }
            ]);
            secureLocalStorage.setItem('data', JSON.stringify([
                { message: FirstMessageBody.body, from: userMsisdn, to: panditMsisdn, dateTimeStamp: Date.now(), state: 0 },
                { message: secondMessage, from: userMsisdn, to: panditMsisdn, dateTimeStamp: Date.now(), state: 1, originIpAddress: 'pandit ji' }
            ]));
            secureLocalStorage.setItem('route','chat');
        }
        else if(chatKey === (panditMsisdn+userMsisdn)){
            return;
        }
       
    }, [])

    useEffect(() => {
        if(secureLocalStorage.getItem("chatFrom") !== null ){
            if (ddd[0].orderDetail.subsidizedCampaignId !== undefined) {
                setTimeout(() => {
                    var url = ASTRO_URL + GET_ORDER_WHITE_GOODS;
                    const headers = getCommonHeaders();
                    const body = {
                        address: {
                            addressLine1: '',
                            addressLine2: '',
                            city: '',
                            country: '',
                            deliveryMobileNo: localStorage['msisdn'],
                            deliveryName: '',
                            houseNo: '',
                            pinCode: '',
                            state: ''
                        },
                        isQuantityCheck: "0",
                        isSelfPaytm: "0",
                        paytmNumber: "0",
                        products: [
                            {
                                "redeemParentCategory": "whiteGoods",
                                "redeemCategory": "Chat",
                                "redeemMode": "",
                                "redeemPoint": 0,
                                "redeemValue": 0,
                                "redeemUnit": 1,
                                "redeemId": 278,
                                "imageUrl": "https://astroking.com/FlexImages/1_Mall_Rudrakash Mala.jpg",
                                "goodsNameKey": "RudrakashMala",
                                "whiteGoodsDetails": {
                                    "goodsId": 278,
                                    "clientId": "ASTRO_20200825",
                                    "campaignId": 1,
                                    "goodsCategory": "Course",
                                    "goodsNameKey": "RudrakashMala",
                                    "goodsName": "Rudrakash Mala",
                                    "goodsPrice": 0,
                                    "goodsPoints": 0,
                                    "goodsQuantity": 1,
                                    "goodsDescription": "Rudrakh mala ke dwara aap mantro ka jaap kare.",
                                    "goodsDescriptionhindi": null,
                                    "goodsShortDescription": null,
                                    "goodsShortDescriptionhindi": null,
                                    "goodsBrief": "Free Delivery",
                                    "goodsDeliveryTime": "7 days",
                                    "goodsImage": "https://astroking.com/FlexImages/1_Mall_Rudrakash Mala.jpg",
                                    "goodsVideo": null,
                                    "language": "en",
                                    "sequence": "1",
                                    "whiteGoodImages": [],
                                    "updateTimestamp": "2021-06-15T13:18:04.000+0000",
                                    "redeemFlag": false,
                                    "appLanguage": "en",
                                    "payoutPercent": null,
                                    "isPremium": 0,
                                    "premiumPrice": null,
                                    "goodsPriceUSD": "0.0",
                                    "goodsNameHindi": null,
                                    "poojaUrl": null,
                                    "panditName": null,
                                    "participants": null,
                                    "bestTime": null,
                                    "preparationAndIntegration": null,
                                    "isOffline": null
                                }
                            }
                        ],
                        redemptionAddress: "",
                        totalRedeemPoints: 0,
                        voucher_transaction_id: ''
                    };
                    postApi(url, headers, body)
                        .then((response) => response.data)
                        .then((data) => {
                            if (data && data.code == ErrorConstant.SUCCESS_CODE) {
                                console.log(data);
                                $('#Reviewpopup').modal('show')
                            }
                        }).catch((error) => {
                            console.error("error", error);
                        });
    
                }, subsidizeTime)
            }
        }
    }, [])


    const requestBody = {
        from: userMsisdn,
        to: panditMsisdn,
        body: message,
        state: 0,
        timestamp: Date.now()
    }

    const handleClickSendMessage = (SendMessages) => {
        sendMessage(JSON.stringify(SendMessages))
    };

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Connected',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const handleChange = e => {

        if (lastMessage !== null || secureLocalStorage.getItem('chatKey')) {
            setValue(e.target.value);
            $('.chat-window__input').removeClass('is-invalid')
            $('.chat-window__send-btn').removeClass('is-invalid')
            $('.errorMsg').css('display', 'none')
        } else {
            $('.chat-window__input').addClass('is-invalid')
            $('.chat-window__send-btn').addClass('is-invalid')
            $('.errorMsg').css('display', 'block')
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // if(){}
        if (lastMessage !== null) {
            handleClickSendMessage(requestBody);
            onMessageSent({ message, originIpAddress: ipAddress, dateTimeStamp: Date.now() });
            secureLocalStorage.setItem('data', JSON.stringify([
                ...Array.from(JSON.parse(secureLocalStorage.getItem('data'))),
                { message, originIpAddress: ipAddress, dateTimeStamp:Date.now()} 
            ]));
            // console.log(lastMessage);
            calculateuserChatDeduction(chat_startTime, df.pop().dateTimeStamp)
            setValue("");
        } 
        else {
            if (ddd[0].orderDetail.subsidizedCampaignId !== undefined) {
                showPopUpFun("You've used up your free campaign, please recharge your account to talk and chat with astrologer.", false);

            } 
            else if(secureLocalStorage.getItem('chatKey')) {
                handleClickSendMessage(requestBody);
                onMessageSent({ message, originIpAddress: ipAddress });
                secureLocalStorage.setItem('data', JSON.stringify([
                    ...Array.from(JSON.parse(secureLocalStorage.getItem('data'))),
                    { message, originIpAddress: ipAddress, dateTimeStamp:Date.now() }
                ]));
                calculateuserChatDeduction(moment(df.pop().dateTimeStamp).format("hh:mm"))
                setValue("");
            }else {
                showPopUpFun("you are in the queue! Astrologer's first reply is awaited. You will not be charged till then.", false);

            }

        }

    };
    const showPopUpFun = (msg, isSuccess) => {
        setmsg(msg);
        setisSuccess(isSuccess);
        setshowPopUp(true);
    }
    const setChatWindowScrollPosition = () => {
        const _chatWindowBody = chatWindowBody.current;
        _chatWindowBody.scrollTop = _chatWindowBody.scrollHeight;
    };

    const autExpandInput = () => {
        const _userInput = userInput.current;
        _userInput.style.height = "auto";
        _userInput.style.height = `${_userInput.scrollHeight}px`;
    };

    const onMessageSent = message => {
        setMessages([
            ...messages,
            { ...message, dateTimeStamp: Date.now()}
        ]);
    };


    useEffect(() => {
        setIpAddress(undefined)
        setFocusTrap(
            createFocusTrap(chatWindow.current, {
                clickOutsideDeactivates: true,
                fallbackFocus: chatWindow.current
            })
        );
    }, []);

    useEffect(() => {
        if (!focusTrap) return;

        if (isOpen) {
            focusTrap.activate();
        } else {
            focusTrap.deactivate();
        }
    }, [isOpen, focusTrap]);

    useEffect(() => {
        setChatWindowScrollPosition();
    }, [messages]);

    useEffect(() => {
        autExpandInput();
    }, [message]);

    const closePopUpFun1 = () => {
        // alert(Routemsg)
        if(typeof secureLocalStorage.getItem('route') === undefined) {
            props.history.push({
                pathname: FRONTEND_NAME + '/chatList',
                state: { typeOfService: "Chat" },
            });
        }else {
            $('#exampleModalCenter').modal('hide');
        }
        setshowPopUp(false);
        var url = typeof secureLocalStorage.getItem('route') === 'undefined' ? 'home' : 'chat';
        

    };
    const closePopUpFun = () => {
        // alert(Routemsg)
        setshowPopUp(false);
    };

    

    return (
        <div
            ref={chatWindow}
            className={classnames("chat-window", {
                "is-open": isOpen,
                [`chat-window--${position}`]: position
            })}
        >
            <Popup2 chatEndHandle={ChatEnded} />
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

            <div className="wt-100 d-flex justify-content-between align-items-center">
                <span className={customReadyState !== 3 ? connectionStatus === 'Connected' ? "online_dot" : "offline_dot" : "offline_dot"}>{ }</span>
                <span>{secureLocalStorage.getItem("chatFrom") !== null ? ddd[0].orderDetail.goodsName:""}</span>
                <button className="endBtn_for_chat mt-2 mr-2 mb-2" onClick={() => {
                    $('#exampleModalCenter').modal('show');
                    handleDisconnectClick()
                }}>{("Chat end")}</button>
            </div>
            <ReviewPopup title={t('Your_review')} props={props} userMsisdn={userMsisdn} reviewName={location.state.data.fname} />
            <div ref={chatWindowBody} className="chat-window__body">
                {df.map(({ originIpAddress, ...props }) => {
                    return (
                        <ChatMessage
                            key={Math.random()}
                            isSameOrigin={originIpAddress === ipAddress}
                            {...props}
                        />
                    )
                })}
            </div>
            <div className="chat-window__footer">
                <form onSubmit={handleSubmit}>
                    {displayEmoji ? <Picker onEmojiClick={onEmojiClick} /> : null}

                    <input
                        type="text"
                        ref={userInput}
                        className="chat-window__input"
                        rows="1"
                        placeholder="Type a message..."
                        value={message}
                        onChange={handleChange}
                    />
                    <button
                        className="chat-window__send-btn"
                        type="submit"
                        disabled={lastMessage !== null || secureLocalStorage.getItem('chatKey') ? !message : true}
                    >
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>



                </form>


                <button className="btn fa-10" onClick={() => {
                    if (displayEmoji) {
                        setdisplayEmoji(false)
                    } else setdisplayEmoji(true)
                }}> {displayEmoji ? <i class="bi bi-x-circle"></i> : <i class="bi bi-emoji-smile"></i>}</button>
            </div>
            {<span className="errorMsg text-left ml-2">*You are in the queue! Astrologer's first reply is awaited. You will not be charged till then.</span>}
        </div>
    );
};

ChatWindow.propTypes = {
    isOpen: PropTypes.bool,
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            originIpAddress: PropTypes.string,
            message: PropTypes.string,
            dateTimeStamp: PropTypes.string
        })
    ),
    onClose: PropTypes.func,
    onMessageSent: PropTypes.func,
    position: PropTypes.oneOf([
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left"
    ]),
    title: PropTypes.string
};

ChatWindow.defaultProps = {
    isOpen: false,
    position: "bottom-right",
};

export default ChatWindow;
