import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./chat_message.css";
import moment from "moment";

const ChatMessage = ({ dateTimeStamp, message, isSameOrigin }) => {
  return (
    <div
      className={classnames("chat-message", {
        "is-same-origin": isSameOrigin
      })}
    >
      <div className="chat-message__item__timestamp">{moment(dateTimeStamp).format("LLLL")}</div>
      <div className="chat-message__item">
        <span className="chat-message__item__text">{message}</span>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.string,
  fromMe: PropTypes.bool
};

ChatMessage.defaultProps = {
  message: "",
  fromMe: false
};

export default ChatMessage;
