import React, { useState } from 'react'
import Chat_Talk_Header from '../common/Chat&Talk_Header'
import { getCommonHeaders } from "../configuration/commonFunctions";
import apis from "../configuration/apis";
import ReactPlayer from "react-player";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import Header2 from '../common/Header2'
import PageBanner from '../common/pageBanner'
import Banner from '../images/readmorebanner.png'

function Videos(props) {
    const { t } = props;

    const [state, setState] = useState({
        displaySignupPopUp: false,
        loginSelected: false,
        isHeaderOpen: false,
        countryCode: [],
        astroVideos: []

    })

    const { displaySignupPopUp, loginSelected, countryCode } = state


    const openSignupPopup = () => {
        setState({
            displaySignupPopUp: true,
            loginSelected: false,
        });
    };

    const openLoginPopup = () => {
        setState({ displaySignupPopUp: true, loginSelected: true });
    };

    const changeIsHeaderOpen = (headerOpen) => {
        setState({
            isHeaderOpen: headerOpen
        })
    }

    const fetchAstrologyVideo = () => {
        const headers = getCommonHeaders()
        const body = {
        }

        apis
            .getLearningVideo(body, headers)
            .then(response => response.data)
            .then(data => {
                console.log(data)
                if (data.code === 2000 && data.data) {
                    console.log(data)
                    setState({
                        ...state,
                        astroVideos: data.data.length > 4 ? data.data : data.data
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    React.useEffect(() => {
        fetchAstrologyVideo();
        console.log(props);
    }, []);

    return (
        <>
            <Chat_Talk_Header
                IsNavIconTrue={false}
                IsSearchTrue={false}
                IsFilterTrue={false}
                // editSearchTerm={this.editSearchTerm}
                // editSortTerm={this.editSortTerm}
                // IsMob_Side_Nave={this.IsMob_Side_Nave}
                propsData={props}
                CustomClass={true}
                IsTitleTrue={true}
                title={t("Videos")}

            />

            <Header2
                IsActive_header_Or_not="chat_and_talk_header-"
                openLoginPopup={openLoginPopup}
                openSignupPopup={openSignupPopup}
                isLogin={loginSelected}
                countryCode={countryCode}
                changeIsHeaderOpen={changeIsHeaderOpen}
            />
            <div className='mob_480'>
                <PageBanner Banner={Banner} title={'Videos'} />
            </div>

            <div className="videos_container container mt-5">
                <div className="videos_inner_container d-flex align-items-center justify-content-between flex-wrap">
                    {state.astroVideos && state.astroVideos.map(item => {
                        return (
                            <div className="viceo_card" key={item.id}>
                                <ReactPlayer
                                    url={item.videourl}
                                    controls={true}
                                    className="react-player"
                                    playing
                                    width="100%"
                                    height="100%"
                                    light={true}
                                    config={{
                                        youtube: {
                                            playerVars: { showinfo: 1 }
                                        }
                                    }}
                                />
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}


const withCombine = compose(
    withTranslation()
)

export default withCombine(Videos);