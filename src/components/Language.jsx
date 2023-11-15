import React from "react";

import "../styles/popup.css";
import lang from "../images/lang.svg";
import * as Constant from "../configuration/constants";
import { getCommonHeaders } from "../configuration/commonFunctions";
import { postApi } from "../configuration/apis";
import * as ErrorConstant from "../configuration/errorConstants";
import { withTranslation } from 'react-i18next';


class Language extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex:
        sessionStorage["myLanguages"] != null
          ? sessionStorage["myLanguages"].split(",")
          : [],
      keysValue: [],
      showPopUp: false,
      button: "Ok",
      userProfile:
        localStorage["userProfile"] != null
          ? JSON.parse(localStorage["userProfile"])
          : {},
    };
  }
  componentDidMount() {
    this.getKeysValue();
  }

  removeLanguage(item) {
    var array = [...this.state.activeIndex]; // make a separate copy of the array
    var index = array.indexOf(item.value);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ activeIndex: array });
    }
  }

  toggleClass = (item) => {
    if (this.state.activeIndex.includes(item.value)) {
      document.getElementById(item.id).style.backgroundColor = "#F4F6F9";
      document.getElementById(item.id).style.color = "#414853";
      this.removeLanguage(item);
    } else {
      document.getElementById(item.id).style.backgroundColor = "#FF9C05";
      document.getElementById(item.id).style.color = "#fffffe";
      this.setState({
        activeIndex: [...this.state.activeIndex, item.value],
      });
    }
  };

  setLanguages = () => {
    sessionStorage["myLanguages"] = this.state.activeIndex;
    console.log(sessionStorage["myLanguages"]);
    this.props.closePopup();
  };

  getKeysValue = () => {
    console.log("inside getKeysValue method");
    var url = Constant.ASTRO_URL + Constant.GET_KEYS_VALUE;
    const body = {
      key: [Constant.LANGUAGE_KEY],
    };
    const headers = getCommonHeaders();
    headers.accessToken = this.state.userProfile.accessToken;
    headers.msisdn = localStorage["msisdn"];
    console.log("body", body);
    postApi(url, headers, body)
      .then((response) => response.data)
      .then((data) => {
        if (data && data.code == ErrorConstant.SUCCESS_CODE) {
          console.log("data ", data.data);
          try {
            this.setState({
              keysValue: data.data,
              enableLoader: true,
            });
          } catch (error) {
            console.log("exception occured");
            // this.toggleShowMsg("Something went wrong");
            this.setState({ enableLoader: false });
          }
        } else {
          console.log(
            "Error code from getKeysValue API : ",
            data.code,
            "with msg : ",
            data.msg
          );
          this.setState({ enableLoader: false });
        }
      })
      .catch((error) => {
        console.log();
        console.error("error", error);
        this.setState({ enableLoader: false });
      });
  };

  render() {
    const {t}= this.props;
    const { keysValue } = this.state;
    return (
      <>
        {/* <!-- Button trigger modal --> */}
        {/* <button
          id="modal_btn"
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Launch demo modal
        </button> */}
        {/* <!-- Modal --> */}
        <div class="modal language" role="dialog" style={{ display: "block" }}>
          <div class="modal-dialog modal-dialog-m" role="document">
            <div class="modal-content modal-content-m">
              <div class="modal-header">
                <h5
                  class="modal-title"
                  id="exampleModalLongTitle"
                  style={{
                    fontSize: "18px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <img src={lang} alt="language" />
                 {t('My_Languages')}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.props.closePopup}
                >
                  <span
                    aria-hidden="true"
                    style={{ color: "#ffffff", opacity: "1" }}
                  >
                    &times;
                  </span>
                </button>
              </div>
              <div class="modal-body">
                {keysValue.map((item, index) => (
                  <a
                    className="btn"
                    id={item.id}
                    onClick={() => this.toggleClass(item)}
                    style={
                      [...this.state.activeIndex].includes(item.value)
                        ? { background: "#FF9C05", color: "#fffffe" }
                        : { background: "#F4F6F9", color: "#414853" }
                    }
                  >
                    {item.value}
                  </a>
                ))}
                {/*<a className="btn" href="#">English</a>
                                <a className="btn" href="#">English</a>
                                <a className="btn" href="#">English</a>
                                <a className="btn" href="#">English</a>
                                <a className="btn" href="#">English</a>
                                <a className="btn" href="#">English</a>
                                <a className="btn" href="#">English</a>
                                <a className="btn" href="#">English</a>
                                <a className="btn" href="#">English</a>
                                <a className="btn" href="#">English</a>
                            <a className="btn" href="#">English</a>*/}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-done"
                  data-dismiss="modal"
                  onClick={this.setLanguages}
                >
                  {t('Done')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withTranslation()(Language);
