import React from 'react'
import '../styles/home.css'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import error from "../images/error.png";
import success from "../images/newImages/Right-Correct-check.png";
import WaitIcon from "../images/newImages/waiting.png";

import { withTranslation } from "react-i18next";
import Jiouser from './productslanding/Jiouser';

class Popup extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="modal modal_popup1" style={{ display: "block" }}>
                <div className="home-modal-content">
                    {this.props.Isicon ? <div className="">
                        <img src={this.props.IsiconType === 'error' ? error : this.props.alert_panditMsg === "pandit busy" ? WaitIcon : success} alt="err" width={'51px'} height={'51px'} />
                    </div> : null}
                    <p className="c-text mt-3">{this.props.t(this.props.heading)}</p>
                    <p className="p-desc text-gray">{this.props.t(this.props.msg)}</p>
                    <div className="modal-button">
                        <button onClick={this.props.closePopUp} type="button" className="m-btn">{this.props.button == "Ok" ? this.props.t("Ok") : this.props.t("Done")} </button>
                    </div>
                </div>
            </div>
        );
    }
}

const withCombine = compose(
    withRouter,
    withTranslation()
)

export default withCombine(Popup);
