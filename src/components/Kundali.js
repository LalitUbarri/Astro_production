import React, { useState } from 'react'

// import Header from "../common/Header"
import Footer from "../common/Footer"
// import BottomHeader from "../common/BottomHeader"
import SideMenu from "../common/SideMenu"
import PageHeader from "../common/PageHeader"
import Lagna from "./Lagna"
import Basic from './Basic'

import "../styles/kundali.css"
import Navamsa from './Navamsa'
import Dasha from './Dasha'
import Planets from './Planets'
import DivisionalChart from './DivisionalChart'
import FreeReport from './FreeReport'

import { useTranslation } from "react-i18next"
import Header2 from '../common/Header2'
import Chat_Talk_Header from '../common/Chat&Talk_Header'
import BottomHeader from '../common/BottomHeader'

const Kundali = (props) => {
    const [selectedNav, setSelectedNav] = useState("basic")
    const [startRender, setStartRender] = useState(false)
    const [state, setState] = useState({
        mobSideNaveTrue: false,
        mobPage_headerTrue: false,
    })

    //Translation 
    const [t] = useTranslation()

    if (!props.location.state) props.history.push('/astrology/kundali')
    else {
        if (!startRender) setStartRender(true)
    }

    const IsMob_Side_Nave = (e) => {
        setState({
            ...state,
            mobSideNaveTrue: e

        })
    }
    var titleKey = 'Kundali'

    return (
        <>
            <Chat_Talk_Header
                IsNavIconTrue={false}
                IsSearchTrue={false}
                IsFilterTrue={false}
                // editSearchTerm={this.editSearchTerm}
                // editSortTerm={this.editSortTerm}
                IsMob_Side_Nave={IsMob_Side_Nave}
                IsTitleTrue={true}
                // CustomClass={true}
                propsData={props}
                title={titleKey}
            />
            <Header2
                IsActive_header_Or_not="chat_and_talk_header-"
                
            />
            
            <PageHeader
              Mob_HeaderIsTrue={'not_show_mob_header1'}

                name={{ firstname: 'Kundali', lastname: '' }}
                showSortOptions={true}
            />
            {startRender &&
                <div className="page-body">
                    <div className="row">
                    <div className="col-xs-12 col-md-3 mobsidemenu">
            <SideMenu />
          </div>
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-12 mob-kundali">
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <div onClick={() => setSelectedNav("basic")} className={selectedNav === "basic" ? "kundali-nav kundali-nav-active" : "kundali-nav"} >
                                                {t('Basic')}
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div onClick={() => setSelectedNav("lagna")} className={selectedNav === "lagna" ? "kundali-nav kundali-nav-active" : "kundali-nav"}>
                                                {t('Lagna')}
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div onClick={() => setSelectedNav("navamsa")} className={selectedNav === "navamsa" ? "kundali-nav kundali-nav-active" : "kundali-nav"}>
                                                {t('Navamsa')}
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div onClick={() => setSelectedNav("dasha")} className={selectedNav === "dasha" ? "kundali-nav kundali-nav-active" : "kundali-nav"}>
                                                {t('Dasha')}
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div onClick={() => setSelectedNav("planets")} className={selectedNav === "planets" ? "kundali-nav kundali-nav-active" : "kundali-nav"}>
                                                {t('Planets')}
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div onClick={() => setSelectedNav("chart")} className={selectedNav === "chart" ? "kundali-nav kundali-nav-active" : "kundali-nav"}>
                                                {t('Divisional Charts')}
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div onClick={() => setSelectedNav("freereport")} className={selectedNav === "freereport" ? "kundali-nav kundali-nav-active" : "kundali-nav"}>
                                                {t('Free report')}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    {(selectedNav === 'basic') && <Basic kundaliData={props.location.state.kundaliFormData} />}
                                    {(selectedNav === 'lagna') && <Lagna kundaliData={props.location.state.kundaliFormData} />}
                                    {(selectedNav === 'navamsa') && <Navamsa kundaliData={props.location.state.kundaliFormData} />}
                                    {(selectedNav === 'dasha') && <Dasha kundaliData={props.location.state.kundaliFormData} />}
                                    {(selectedNav === 'planets') && <Planets kundaliData={props.location.state.kundaliFormData} />}
                                    {(selectedNav === 'chart') && <DivisionalChart kundaliData={props.location.state.kundaliFormData} />}
                                    {(selectedNav === 'freereport') && <FreeReport kundaliData={props.location.state.kundaliFormData} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <Footer history={props} />
        </>
    )
}

export default Kundali;