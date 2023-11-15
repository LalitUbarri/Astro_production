import React from "react";
import { withRouter } from "react-router-dom";
//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
import "../styles/login.css";
import Header from "../common/Header2";
import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
import checkmark from "../images/checkmark-outline.svg";
import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
import user from "../images/user.svg";
import smile from "../images/smile.png";
// import attach from "../images/attach.svg";
import { APP_NAME, FRONTEND_NAME } from "../configuration/constants";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import apiUrls from "../configuration/apiUrls";
import apis from "../configuration/apis";
import { getCommonHeaders } from "../configuration/commonFunctions";
import Popup from "./popupChat";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Picker from "emoji-picker-react";
// import ReactTimerStopwatch from "react-stopwatch-timer";
import StarRatingComponent from "react-star-rating-component";

class ChatAstrology extends React.Component {
  constructor(props) {
    super(props);
    this.intervalId = 0;
    var userProfile = JSON.parse(localStorage.getItem("userProfile"));
    this.state = {
      chatId: sessionStorage["chatId"] ? sessionStorage["chatId"] : "",
      oldChats: [],
      userMsisdn: localStorage["msisdn"],
      panditMsisdn: this.props.location.state
        ? this.props.location.state.panditMsisdn
        : "",
      notifyPanditMsisdn: "",
      reviewerName: userProfile
        ? userProfile.userDetails.firstName + userProfile.lastName
        : "",
      userMsg: "",
      userMsgTime: "",
      panditMsg: "",
      panditMsgTime: "",
      inputMessage: "",
      newChats: [],
      userAvailable: false,
      chatEnded: false,
      showPopUp: false,
      msg: "",
      isSuccess: false,
      dateType: "",
      emoji: "",
      displayEmoji: false,
      panditPic: "",
      // totalChatTime: "",
      // chatTime: "",
      // chatEndTime: "",
      rating: "",
      review: "",
      showReview: false,
    };

    this.getNewChats = this.getNewChats.bind(this);
  }
  componentDidMount() {
    //  this.handleNotification();
    if (!this.state.chatId) {
      this.startConversation();
    } else {
      this.getOldChat(this.state.chatId);
      this.setState({
        userAvailable: true,
      });
    }
    //this.getNewChats();
  }
  handleNotification = () => {
    let requestUrl = window.location.href;
    let notifyurl = new URL(requestUrl);

    if (!requestUrl.includes("?")) return;

    let targetActionType = notifyurl.searchParams.get("targetActionType");
    let targetActionData = notifyurl.searchParams.get("targetActionData");
    let requestStatus = notifyurl.searchParams.get("requestStatus");
    console.log(
      "targetAction",
      targetActionType,
      "targetActionData",
      targetActionData,
      "requestStatus",
      requestStatus
    );
    let strArray = targetActionData.split("|");
    let chatStatus = strArray[0];
    let panditMsisdn = strArray[1];

    if (chatStatus == "Accepted") {
      this.setState({
        panditMsisdn: panditMsisdn,
        notifyPanditMsisdn: panditMsisdn,
      });
      this.startConversation();
    }
  };
  // setDate = () => {
  //   let today = moment().format("DD-MM-YYYY");
  //   let current = moment().format("DD-MM-YYYY");
  //   if (today == current) {
  //     this.setState({
  //       dateType: "Today",
  //     });
  //   } else {
  //     this.setState({
  //       dateType: moment().format("DD-MM-YYYY"),
  //     });
  //   }
  // };
  getNewChats() {
    try {
      this.intervalId = setInterval(async () => {
        let url = apiUrls.newChat;
        let chatId = this.state.chatId;
        url = url.replace("<userMsisdn>", Number(this.state.userMsisdn));
        url = url.replace("<appName>", APP_NAME.replace(/['"]+/g, ""));
        url = url.replace("<chatId>", chatId.replace(/['"]+/g, ""));

        const response = await apis.newChat(url);
        //  const response = await res;
        console.log("new chat repsonse", response);
        if (response.data.code == "2000") {
          if (
            response &&
            response.data &&
            response.data.data &&
            response.data.data.length > 0
          ) {
            let newChatArray = response.data.data;
            console.log("NEW CHAT ARRAY", newChatArray);
            let existingArray = this.state.newChats;
            newChatArray.map((item) => {
              existingArray.push(item);
            });

            this.setState({
              newChats: existingArray,
            });
          }
        } else if (response.data.code == "2001") {
          clearInterval(this.intervalId);
          this.setState({
            chatEnded: true,
            showReview: true,

            //chatEndTime: this.state.chatTime,
          });
          delete sessionStorage["chatId"];
          this.showPopUp("The chat has ended.", false);
        } else {

          console.log("error ocurred");
        }
      }, 3000);

      console.log("mount", this.intervalId);
    } catch (e) {
      console.log(e);
    }
  }
  submitMessage = (e) => {
    if (e.charCode === 13) {
      this.sendMessage();
    }
  };
  setMessage = (event) => {
    console.log("event.target.value", event.target.value);
    let inputMsg = event.target.value;

    this.setState({
      inputMessage: inputMsg,
    });
  };
  sendMessage = () => {
    let inputMsg = this.state.inputMessage;
    if (!inputMsg) return;

    let chatId = this.state.chatId;
    let url = apiUrls.send;
    url = url.replace("<chatId>", chatId.replace(/['"]+/g, ""));
    url = url.replace("<chatMessage>", inputMsg.replace(/['"]+/g, ""));
    url = url.replace("<panditMsisdn>", Number(this.state.panditMsisdn));
    url = url.replace("<userMsisdn>", Number(this.state.userMsisdn));
    url = url.replace("<appName>", APP_NAME.replace(/['"]+/g, ""));

    return apis.send(url).then((response) => {
      var data = response.data;

      if (data.code == 2000) {
        let messageObj = {
          appName: APP_NAME,
          chatId: this.state.chatId,
          from: this.state.userMsisdn,
          id: "",
          message: inputMsg,
          messageTime: new Date().getTime(),
          to: this.state.panditMsisdn,
        };

        let newChatAr = this.state.newChats;
        newChatAr.push(messageObj);

        console.log("response send ", data);
        this.setState({
          newChats: newChatAr,
          inputMessage: "",
        });
      } else {
        console.log("ERROR", data.msg);
      }
    });
  };
  startConversation = () => {
    let url = apiUrls.startConversation;
    url = url.replace("<appName>", APP_NAME.replace(/['"]+/g, ""));
    url = url.replace("<userMsisdn>", Number(this.state.userMsisdn));
    url = url.replace("<panditMsisdn>", Number(this.state.panditMsisdn));

    var headers = getCommonHeaders();
    console.log("url main", url);
    apis
      .startConversation(url, { headers })
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          sessionStorage["chatId"] = data.data.chatId;
          this.setState({
            chatId: data.data.chatId,
            panditPic: data.data.profilePicUrl,
            userAvailable: true,
          });
          this.getOldChat(this.state.chatId);
          //  this.fetchPanditForChat();
        } else {
          console.log(data.msg);
          this.showPopUp(data.msg, false);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  endConversation = () => {
    let url = apiUrls.endChat;
    let chatId = this.state.chatId;
    url = url.replace("<appName>", APP_NAME.replace(/['"]+/g, ""));
    url = url.replace("<userMsisdn>", Number(this.state.userMsisdn));
    url = url.replace("<panditMsisdn>", Number(this.state.panditMsisdn));
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
          this.showPopUp("Chat ended", false);
          console.log("Chat ended.");
          this.setState({
            chatEnded: true,
            showReview: true,
          });
        } else {
          console.log(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchPanditForChat = () => {
    let url = apiUrls.getLivePanditForUser;
    url = url.replace("<appName>", APP_NAME.replace(/['"]+/g, ""));
    url = url.replace("<userMsisdn>", Number(this.state.userMsisdn));

    return apis.getLivePanditForUser(url).then((response) => {
      var data = response.data;

      if (data.code == "2000") {
        let chatClients = data.data;
        let chatClient = "";

        if (chatClients && chatClients.length > 0) {
          chatClient = chatClients[0];

          if (this.state.notifyPanditMsisdn)
            chatClient = chatClients.find(
              (userObj) => userObj.msisdn == this.state.notifyPanditMsisdn
            );

          if (chatClient) {
            this.setState({
              panditMsisdn: chatClient.msisdn,
              panditPic: chatClient.profilePicUrl,
              userAvailable: true,
              //chatTime: new Date(0, 0, 0, 0, 0, 0, 0),
            });
            this.startConversation();
            this.getOldChat(chatClient.chatId);
            //this.getNewChats();
          }
        }
      } else {
        console.log("ERROR", data.msg);
        this.setState({
          userAvailable: false,
        });
      }
    });
  };

  getOldChat = (chatId) => {
    let url = apiUrls.getChat;
    url = url.replace("<appName>", APP_NAME.replace(/['"]+/g, ""));
    url = url.replace("<chatId>", chatId.replace(/['"]+/g, ""));
    url = url.replace("<userMsisdn>", Number(this.state.userMsisdn));
    url = url.replace("<panditMsisdn>", Number(this.state.panditMsisdn));

    return apis.getChat(url).then((response) => {
      var data = response.data;

      if (data.code == 2000) {
        let oldChat = data.data;
        console.log("response getOldChat ", oldChat);
        if (oldChat) {
          this.setState({
            oldChats: oldChat,
          });
        }

        setTimeout(() => {
          this.getNewChats();
        }, 3000)

      } else {
        console.log("ERROR", data.msg);
      }
    });
  };

  closePopUp = () => {
    this.setState({
      showPopUp: false,
    });
  };

  onEmojiClick = (event, emojiObject) => {
    this.setState((prevState) => {
      return { inputMessage: prevState.inputMessage + emojiObject.emoji };
    });
  };

  showEmoji = () => {
    if (this.state.displayEmoji) {
      this.setState({
        displayEmoji: false,
      });
    } else {
      this.setState({
        displayEmoji: true,
      });
    }
  };

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue });
  };

  reviewSubmit = () => {
    //alert(`review ${this.state.review} rating ${this.state.rating}`);
    let url = apiUrls.submitChatReview;

    if (!this.state.rating || !this.state.review) {
      this.showPopUp("Please enter the required fields", false);
      return;
    }
    let body = {
      productId: this.state.userMsisdn,
      rating: this.state.rating,
      review: this.state.review,
      reviewerName: this.state.reviewerName,
    };
    return apis.submitChatReview(url, body).then((response) => {
      var data = response.data;

      if (data.code == 2000) {
        // let oldChat = data.data;
        // console.log("response getOldChat ", oldChat);
        // if (oldChat) {
        //   this.setState({
        //     oldChats: oldChat,
        //   });
        // }
        this.setState({
          showReview: false,
        });
        this.props.history.push({
          pathname: FRONTEND_NAME + "/chatList",
          state: { typeOfService: "Chat" },
        });
      } else {
        console.log("ERROR", data.msg);
      }
    });
  };
  updateReview = (evt) => {
    this.setState({
      review: evt.target.value,
    });
  };

  showPopUp(msg, isSuccess) {
    this.setState({
      showPopUp: true,
      msg: msg,
      isSuccess: isSuccess,
    });
  }

  componentWillUnmount() {
    // this.endConversation();
    console.log("interval id", this.intervalId);
    clearInterval(this.intervalId);

  }
  render() {
    const {
      oldChats,
      userMsisdn,
      panditMsisdn,
      newChats,
      userAvailable,
      chatEnded,
      showPopUp,
      msg,
      isSuccess,
    } = this.state;
    // window.onclick = function (event) {
    //   if (event.target != document.getElementById("emojiPicker")) {
    //     document.getElementById("emojiPicker").style.display = "none";
    //   }
    // };
    return (
      <>
        {showPopUp && (
          <Popup
            msg={msg}
            isSuccess={isSuccess}
            closePopUp={this.closePopUp}
            chatEnded={chatEnded}
          />
        )}
        <div className="container" id="chat-container">
          <Header />
          <HeaderMenu />
          <PageHeader
            name={{ firstname: "CHAT", lastname: "WITH ASTROLOGY" }}
          />
          <div className="row page-body" style={{ marginLeft: '-17px' }}>

            <div className="show-l"><SideMenu /></div>

            <div className="col bg-chat">
              {/* <ReactTimerStopwatch
                isOn={true}
                fromTime={this.state.chatTime}
                displayHours={false}
                className="react-stopwatch-timer__table"
                watchType="stopwatch"
              /> */}
              {userAvailable ? (
                <>
                  <div style={{ overflow: "hidden", marginBottom: "15px" }}>
                    <p
                      className="today-day today-top"
                      style={{ float: "left", width: "calc(100% - 70px)" }}
                    >
                      Today
                    </p>
                    <span style={{ float: "right", marginTop: "10px" }}>
                      <button
                        style={{
                          fontSize: "10px",
                          border: "1px solid #ffffff",
                          padding: "0px 20px",
                          borderRadius: "10px",
                          backgroundColor: "#FF9C05",
                          color: "#ffffff",
                        }}
                        onClick={this.endConversation}
                      >
                        End
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
                                    src={
                                      this.state.panditPic
                                        ? this.state.panditPic
                                        : user
                                    }
                                    alt="user"
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
                              <img src={checkmark} className="check-img" alt="img"/>
                            )}
                          </p>
                        </div>
                      ))}

                    {/* NEW PANDITJI MESSAGES */}

                    {newChats &&
                      newChats.length > 0 &&
                      newChats.map((item, index) => (
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
                                    src={
                                      this.state.panditPic
                                        ? this.state.panditPic
                                        : user
                                    }
                                    alt="chat"
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
                              <img src={checkmark} className="check-img" alt="img"/>
                            )} 
                          </p>
                        </div>
                      ))}
                  </div>
                  <div className="bottom-send-chat">
                    <input
                      id="typemessage"
                      type="text"
                      placeholder="Type a message"
                      onChange={this.setMessage}
                      value={this.state.inputMessage}
                      onKeyPress={this.submitMessage}
                      disabled={chatEnded}
                    ></input>
                    <img src={smile} onClick={this.showEmoji} alt="emoji"></img>
                    {/* <img src={attach}></img> */}
                    <button
                      class="msg_send_btn btn"
                      type="button"
                      onClick={this.sendMessage}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                    {this.state.displayEmoji ? (
                      <Picker
                        onEmojiClick={this.onEmojiClick}
                      // id="emojiPicker"
                      // style={{ display: "block" }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  {this.state.showReview && (
                    <div className="feedback-div">
                      <p className="your-review">Your review</p>
                      <StarRatingComponent
                        name="rate"
                        value={this.state.rating}
                        starCount="5"
                        className="star-rating"
                        starColor="#FF9C05"
                        emptyStarColor="#828282"
                        onStarClick={this.onStarClick.bind(this)}
                      />
                      <textarea
                        placeholder="Write your review here…."
                        maxLength="160"
                        value={this.state.review}
                        onChange={this.updateReview}
                      ></textarea>
                      <p className="f-length">
                        {this.state.review.length > 0
                          ? this.state.review.length
                          : 0}
                        /160
                      </p>
                      <button onClick={this.reviewSubmit}>Submit</button>
                    </div>
                  )}
                </>
              ) : (
                <div className="col">
                  <p className="text-center no-data">No data found</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer history={this.props} />
      </>
    );
  }
}

export default withRouter(ChatAstrology);
