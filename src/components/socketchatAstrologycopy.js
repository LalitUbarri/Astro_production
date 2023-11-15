import React, { useState } from 'react';
import ChatWindow from "./chatsys/chat_window";
import moment from "moment";
import Header from "../common/Header2";
import PageHeader from "../common/PageHeader";
import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'

 function WebSocketDemo(props) {
  const [isOpen, setIsOpen] = useState(true);


  return (
    <>
      <Header
        IsActive_header_Or_not="chat_and_talk_header-"
      />

      <div className='container'>
        <PageHeader
          Mob_HeaderIsTrue={'not_show_mob_header1'}
          name={{ firstname: "CHAT", lastname: "WITH ASTROLOGER" }} />
        <div className="mb-5">
          <div className="page-body chat_socket_body d-flex justify-content-between" style={{ marginLeft: '-17px' }}>
            <div className="show-l chat_mob chat-nav_">
              <SideMenu />
            </div>
            <div className={"col bg-chat d-flex align-items-start justify-content-center"}>
              <div className="chatinner_container1" style={{ width: '100%' }}>
                <ChatWindow
                  isOpen={isOpen}
                  props={props}
                />
              </div>

            </div>
          </div>
        </div>



      </div>
      <div className="mob_480">
        <Footer history={props} />
      </div>
    </>
  );
};
const withCombine = compose(
  withTranslation()
)

export default withCombine(WebSocketDemo) 