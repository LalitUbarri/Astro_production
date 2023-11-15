import React from "react";
import { withRouter } from "react-router-dom";
//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
import "../styles/login.css";
import chat from "../images/chat.svg";
import stop from "../images/stop.svg";
import drop from "../images/drop.svg";
import user from "../images/user.png";

class CustomerSupport extends React.Component {
  render() {
    return (
      <div class="container">
        <img
          src={chat}
          alt="chat"
          data-toggle="modal"
          data-target="#myModal"
          className="chat-img"
        ></img>
        {/* <button
          type="button"
          class="btn btn-info btn-lg"
          data-toggle="modal"
          data-target="#myModal"
        >
          Open Modal
        </button> */}

        <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog modal-dialog-c">
            <div class="modal-content w-295">
              <div class="modal-header chat-bg">
                <img src={drop} className="c-1" alt="img"></img>
                <span className="c-2">Live Support Chat</span>
                <img src={drop} className="c-3" alt="img"></img>
                <img
                  src={stop}
                  alt="img"
                  className="c-4 close"
                  data-dismiss="modal"
                ></img>
              </div>
              <div class="modal-body m-body">
                <p className="today-day">Today</p>
                <div className="received">
                  <img src={user} alt="img"></img>
                  <p className="received-p">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <p className="seen">
                    <span>22:17</span>
                    <span
                      style={{ color: "#174AC0", width: "6px", height: "5px" }}
                    >
                      &#x2713;
                    </span>
                  </p>
                </div>
                <div className="sent">
                  <p>Lorem Ipsum is simply dummy text of</p>
                  <p>22:15</p>
                </div>
                <div className="received">
                  <img src={user} alt="user"></img>
                  <p className="received-p">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <p className="seen">
                    <span>22:17</span>
                    <span
                      style={{ color: "#174AC0", width: "6px", height: "5px" }}
                    >
                      &#x2713;
                    </span>
                  </p>
                </div>
                <div className="sent">
                  <p>Lorem Ipsum is simply dummy text of</p>
                  <p>22:15</p>
                </div>
                <div className="received">
                  <img src={user} alt="user"></img>
                  <p className="received-p">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <p className="seen">
                    <span>22:17</span>
                    <span
                      style={{ color: "#174AC0", width: "6px", height: "5px" }}
                    >
                      &#x2713;
                    </span>
                  </p>
                </div>
                <div className="sent">
                  <p>Lorem Ipsum is simply dummy text of</p>
                  <p>22:15</p>
                </div>
              </div>
              <div class="modal-footer chat-type">
                <input placeholder="Type here and press enter…"></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CustomerSupport);
