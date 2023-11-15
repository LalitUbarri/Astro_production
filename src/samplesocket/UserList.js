import React,{Component} from 'react'
import { Link } from "react-router-dom";
import './chat.css'
import SockJsClient from 'react-stomp';
import { FRONTEND_NAME } from '../configuration/constants';
import { SOCKET_URL } from './constants';


//const SOCKET_URL="http://digital.mv1.in:9090/BigWin/greeting"
export default class UserList extends Component{
    debugger;
  
  constructor(props){
      super(props);
      this.state={
          userMsisdn:  sessionStorage["chatUserMsisdn"]? sessionStorage["chatUserMsisdn"]:"",
          userList:[],
          activeChatUsers: []
      }
      /*
     this.userList = [ {
        id: 1,
        msisdn: "8888888888"
    },
    {
        id: 2,
        msisdn: "8888888887"
    },
    {
        id: 3,
        msisdn: "8888888886"
    },
    {
        id: 4,
        msisdn: "8888888885"
    }
]
 */
  }
 

  componentDidMount()
  {
    delete sessionStorage["chatId"];
  }
  onMessageReceive = (msg, topic) => {
    console.log("msg recieved ");
    console.log("msg is.................................. ");

      if (topic.includes("messages")) {
          let userList = msg.filter(item => item != this.state.userMsisdn);

          console.log("My Data is ", topic, JSON.stringify(msg));
          this.setState({
              userList: userList
          })
      }
      else{
          debugger;
          let otherUser= msg;
          let activeUsers= this.state.activeChatUsers;
          activeUsers.push(otherUser);

          sessionStorage["otherUser"]= otherUser.sender;
          sessionStorage["chatId"]= otherUser.chatId?otherUser.chatId:""
          window.open(FRONTEND_NAME + "/chatRoom", '_blank').focus();
          /*
          this.props.history.push({
            pathname: FRONTEND_NAME+ "/chatRoom",
              state: {
                  otherUser: otherUser.sender,
                  chatId: otherUser.chatId?otherUser.chatId:""
              }
          })
          */
          this.setState({
            activeChatUsers: activeUsers
        });
      }
    if (msg.code == 2020) {
    console.log("here");
    } else {
    
    }
    if (msg.code == 5003) {
        console.log("there");
    }
  }

  goToChatRoom =(otherUser,otheruserChatid)=>{
    sessionStorage["otherUser"]= otherUser;
    sessionStorage["chatId"]=otheruserChatid?otheruserChatid:""
    window.open(FRONTEND_NAME + "/chatRoom", '_blank').focus();
      /*
      this.props.history.push({
        pathname: FRONTEND_NAME+ "/chatRoom",
          state: {
              otherUser: otherUser,
              chatId: otheruserChatid?otheruserChatid:""
          }
      })
      */
  }
render()
{
    const {userList,userMsisdn,activeChatUsers}= this.state;
        return (
        <div className="userList">
            <SockJsClient url={SOCKET_URL}
                topics={['/topic/requests/1/'+userMsisdn,'/topic/messages/1']}
                ref={(client) => {
                    this.clientRef = client
                 }} 
                onConnect={() => {
                    console.log("connected socket");
                    
                    this.clientRef.sendMessage("/app/message/addUser", JSON.stringify({sender: this.state.userMsisdn,appId:1}));
                }}
                onDisconnect={() => {
                    console.log("Disconnected");
                }}
                onMessage={this.onMessageReceive}
                
                debug={true}
             />
          
          <h2>All users</h2>
           {userList && userList.length > 0 && 
           userList.map((item,index)=>
           (
            
            <button onClick={()=>this.goToChatRoom(item)} className="enter-room-button">
            {item}
            </button>
           
           )
           )} 
           <h2>Active users</h2>

                {activeChatUsers && activeChatUsers.length > 0 &&
                    activeChatUsers.map((item, index) =>
                    (

                        <button onClick={() => this.goToChatRoom(item.sender,item.chatId)} className="enter-room-button">
                            {item.sender}
                        </button>

                    )
                    )}
           
        </div>
    )
           }
}
