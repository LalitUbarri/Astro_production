import React from 'react'
import BackIcon from '../images/newImages/back.png';
import Filter from '../images/newImages/filter.png'
import Search from '../images/newImages/search.png'
// import WalletIcon from '../images/newImg/wallet.png'
import { FRONTEND_NAME } from "../configuration/constants";
// import PageHeader from './PageHeader';

class Chat_Talk_Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IsTrue: false,
            IsfilterTrue: false,
            IsSearchTrue: false,
            IsNaveTrue: false,
            IsWalletTrue: false,
            searchTerm: "",
            sortTerm: "",
        };
    }

    componentDidMount() {
        // alert(JSON.stringify(this.props.redirection))
    }
    editSearchTerm = (e) => {
        let searchTerm = e.target.value;
        this.setState({
            searchTerm: e.target.value,
        });
        this.props.editSearchTerm(searchTerm);
    };

    editSortTerm = (e) => {
        let sortTerm = e.target.value;
        this.setState({
            sortTerm: sortTerm,
        });
        this.props.editSortTerm(sortTerm);
    };

    showMob_sideNav = () => {
        if (this.state.IsNaveTrue) {
            this.props.IsMob_Side_Nave(this.state.IsNaveTrue);
            this.setState({
                ...this.state,
                IsNaveTrue: false,
                IsTrue: true
            })
        } else {
            this.setState({
                ...this.state,
                IsNaveTrue: true,
                IsTrue: false
            })
            this.props.IsMob_Side_Nave(this.state.IsNaveTrue);
        }

    }

    rediractionUrl = () => {
        this.props.propsData.history.push(FRONTEND_NAME + `/jiouser/${this.props.propsData.history.location.state.state.msisdn === undefined ? "" : this.props.propsData.history.location.state.state.msisdn}`);
    };

    render() {
        const { t } = this.props.propsData
        console.log(this.props);
        return (
            <div className="header_chatAndTalk">
                <div className="Chat_and_talk_header_container">
                    <div className="chat_and_talk_inner_container d-flex align-items-center justify-content-between">
                        <div className={this.props.CustomClass ? "chat_and_talk_Back1 chat_and_talk_Back d-flex align-items-center" : "chat_and_talk_Back"}>
                            <img src={BackIcon} alt="back button" onClick={() => this.props.redirection === 'jiouser' ? this.rediractionUrl() : this.props.propsData.history.push(FRONTEND_NAME + '/home')} width="30px" />
                            {this.props.IsTitleTrue ? <span className={this.props.CustomClass ? "text-white title_widthfull" : "text-white"}> &nbsp;&nbsp; {this.props.title} </span> : null}
                        </div>
                        <div className={this.props.CustomClass ? null : !this.props.IsSearchTrue ? "chat_and_talk_Nav d-flex align-items-center justify-content-end" : "chat_and_talk_Nav d-flex align-items-center justify-content-end mr-50"}>
                            {/* <div className="wallet_header">
                            <img src={WalletIcon} alt="wallet" onClick={() => {
                                if (this.state.IsWalletTrue) {
                                    this.setState({
                                        IsWalletTrue: false,
                                        IsSearchTrue: false,
                                        IsfilterTrue: false
                                    })
                                } else this.setState({
                                    IsWalletTrue: true,
                                    IsfilterTrue: false,
                                    IsSearchTrue: false
                                });

                            }} width="23px" />
                        </div> */}

                            {this.props.IsFilterTrue ? <div className="chat_and_talk_filter">
                                <img src={Filter} alt="filter" onClick={() => {
                                    if (this.state.IsfilterTrue) {
                                        this.setState({
                                            IsSearchTrue: false,
                                            IsfilterTrue: false
                                        })
                                    } else this.setState({ IsfilterTrue: true, IsSearchTrue: false });


                                }} width="15px" />
                            </div> : null}
                            {this.props.IsSearchTrue ? <div className="chat_and_talk_search">
                                <img src={Search} alt="Search" onClick={() => {
                                    if (this.state.IsSearchTrue) {
                                        this.setState({
                                            IsfilterTrue: false,
                                            IsSearchTrue: false,
                                            Search: ''
                                        })
                                    } else this.setState({
                                        IsfilterTrue: false,
                                        IsSearchTrue: true,
                                        Search: ''
                                    })


                                }} width="20px" />
                            </div> : null}

                            {this.props.IsNavIconTrue ? <div className={
                                this.state.IsTrue ? "MobheaderOuter container1 change" :
                                    "MobheaderOuter container1"}
                                onClick={this.showMob_sideNav}
                            >
                                <div class="bar1"></div>
                                <div class="bar2"></div>
                                <div class="bar3"></div>
                            </div> : null}
                        </div>
                    </div>


                    {
                        this.state.IsfilterTrue ? <div className="form-group pd-10">
                            <div className="shot-by">
                                <select
                                    className="form-control"
                                    onChange={this.editSortTerm}
                                    value={this.props.sortTerm}
                                >
                                    <option value="" disabled selected>
                                        {t('SortBy')}
                                    </option>
                                    <option value="expHL">{t('ExperienceHightoLow')}</option>
                                    <option value="expLH">{t('ExperienceLowtoHigh')}</option>
                                    {/* <option value="orderHL">{t('TotalOrdersHightoLow')}</option>
                                    <option value="orderLH">{t('TotalOrdersLowtoHigh')}</option> */}
                                    <option value="priceHL">{t('PriceHightoLow')}</option>
                                    <option value="priceLH">{t('PriceLowtoHigh')}</option>
                                </select>
                            </div>
                        </div> : null
                    }

                    {
                        this.state.IsSearchTrue ? <div className="form-group pd-10">
                            <input
                                type="text"
                                class="form-control"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={this.state.searchTerm}
                                onChange={this.editSearchTerm}
                                placeholder={t('SearchNameSkillLanguage')}
                            />
                        </div> : null
                    }
                </div>
            </div>
        )
    }
}
export default Chat_Talk_Header;