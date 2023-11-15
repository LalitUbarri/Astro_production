import React, { useState } from 'react'

// import Header from "../common/Header"
import Footer from "../common/Footer"
// import BottomHeader from "../common/BottomHeader"
import SideMenu from "../common/SideMenu"
import PageHeader from "../common/PageHeader"

import "../styles/kundali.css"

import { useTranslation } from "react-i18next"
import Header2 from '../common/Header2'

import Koot from './koot'
import BasicMatching from './basicMatching'
import ManglikReport from './manglikReport'
import Chat_Talk_Header from '../common/Chat&Talk_Header'

const MatchingDetails = (props) => {
    const [selectedNav, setSelectedNav] = useState("basic")
    const [startRender, setStartRender] = useState(false)

    //Translation 
    const [t] = useTranslation()

    if (!props.location.state) props.history.push('/astrology/matching')
    else {
        if (!startRender) setStartRender(true)
    }

    return (
        <>
            <Chat_Talk_Header
                IsNavIconTrue={false}
                IsSearchTrue={false}
                IsFilterTrue={false}
                // editSearchTerm={this.editSearchTerm}
                // editSortTerm={this.editSortTerm}
                // IsMob_Side_Nave={IsMob_Side_Nave}
                propsData={props}
                IsTitleTrue={true}
                title={"Match Kundali"}
            />
            <Header2
                IsActive_header_Or_not="chat_and_talk_header-"

            />
            {/* <BottomHeader /> */}
            
            <div className='container mb-5'>
            <PageHeader
                Mob_HeaderIsTrue={'not_show_mob_header1'}
                name={{ firstname: 'Free', lastname: 'Matching' }}
                showSortOptions={true}
            />
            {startRender &&
                <div className="page-body">
                    <div className="row">
                        <div className="col-xs-12 col-md-3 mobsidemenu">
                            <SideMenu />
                        </div>
                        <div className="col-md-9 details_container">
                            <div className="row">
                                <div className="col-md-12 mob-kundali">
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <div onClick={() => setSelectedNav("basic")} className={selectedNav === "basic" ? "kundali-nav kundali-nav-active" : "kundali-nav"} >
                                                {t('Basic')}
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div onClick={() => setSelectedNav("ashtakot")} className={selectedNav === "ashtakot" ? "kundali-nav kundali-nav-active" : "kundali-nav"}>
                                                {t('Ashtakot')}
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div onClick={() => setSelectedNav("dashkoot")} className={selectedNav === "dashkoot" ? "kundali-nav kundali-nav-active" : "kundali-nav"}>
                                                {t('Dashkoot')}
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div onClick={() => setSelectedNav("manglik")} className={selectedNav === "manglik" ? "kundali-nav kundali-nav-active" : "kundali-nav"}>
                                                {t('Manglik Report')}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    {(selectedNav === 'basic') && <BasicMatching kundaliData={props.location.state.kundaliFormData} />}
                                    {(selectedNav === 'ashtakot') && <Koot kundaliData={props.location.state.kundaliFormData} pageSection={'ashtakot'} />}
                                    {(selectedNav === 'dashkoot') && <Koot kundaliData={props.location.state.kundaliFormData} pageSection={'dashkoot'} />}
                                    {(selectedNav === 'manglik') && <ManglikReport kundaliData={props.location.state.kundaliFormData} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </div>
            

            <Footer history={props} />
        </>
    )
}

export default MatchingDetails;