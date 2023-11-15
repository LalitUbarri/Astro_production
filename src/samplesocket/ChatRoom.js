import axios from "axios";
import React, { useState, useEffect } from "react";
import SockJsClient from 'react-stomp';
import "./chat.css";
import { CHAT_API_URL, SOCKET_URL } from "./constants";
// import useChat from "./useChat";
//import useChat from "../useChat";

const ChatRoom = (props) => {


  const [chatId, setchatId] = useState("")
  const [userMsisdn] = useState(sessionStorage["chatUserMsisdn"]);
  // const [otherUser]= useState(props.location.state.otherUser?props.location.state.otherUser:"");
  const [otherUser] = useState(sessionStorage["otherUser"]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [clientRef, setclientRef] = useState("");

  const generateChatId = () => {

    axios.post(CHAT_API_URL + "/generateId", {
      sender: userMsisdn,
      receiver: otherUser,
      chatType: "oneToOne",
      appId: "1"
    })
      .then(response => response.data)
      .then((data) => {
        if (data.code == "2000") {
          debugger;
          let chatData = data.data;
          let chatId = chatData.chatId;
          setchatId(chatId);

        }
        else {

        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  useEffect(() => {
    if (sessionStorage["chatId"])
      setchatId(sessionStorage["chatId"]);
    // setchatId(props.location.state.chatId);
    else
      generateChatId();
  }, [])

  const onMessageReceive = (msg, topic) => {
    console.log("msg recieved ");
    console.log("msg is.................................. ");



    console.log("My Data is ", topic, msg);
    debugger;
    //new messages
    const incomingMessage = {
      ...msg,
      ownedByCurrentUser: msg.senderId === userMsisdn,
    };
    setMessages((messages) => [...messages, incomingMessage]);


    if (msg.code == 2020) {
      console.log("here");
    } else {

    }
    if (msg.code == 5003) {
      console.log("there");
    }
  }


  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };


  const handleSendMessage = () => {
    console.log("new message", newMessage);
    const message = {
      senderId: userMsisdn,
      recipientId: otherUser,
      content: newMessage,
      chatId: chatId,
      appId: '1'
    };

    clientRef.sendMessage("/app/message/individual", JSON.stringify(message));
    setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <SockJsClient url={SOCKET_URL}
        topics={['/topic/messages/1/' + chatId]}
        ref={(client) => {
          setclientRef(client);
        }}
        onConnect={() => {
          console.log("connected socket");

        }}
        onDisconnect={() => {
          console.log("Disconnected");
        }}
        onMessage={onMessageReceive}

        debug={true}
      />

      <h1 className="room-name">Chat Room</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages && messages.length > 0 && messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
            >
              {message.content}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default ChatRoom;
