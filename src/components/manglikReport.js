import { useState, useEffect } from 'react'
// import KundaliNav from '../common/KundaliNav'
// import moment from 'moment'

//API
import { getCommonHeaders } from "../configuration/commonFunctions"
import apis from "../configuration/apis"
import { KundaliBody } from "../configuration/kundaliBody"
import Loading from './loader'

import { useTranslation } from "react-i18next"
import { useHistory } from 'react-router-dom'
import { FRONTEND_NAME } from "../configuration/constants"

const ManglikReport = (props) => {

    const propsData = props.kundaliData
    //Translation 
    const [t] = useTranslation()

    const history = useHistory()

    const [basicMaleData, setBasicMaleData] = useState({})
    const [basicFemaleData, setBasicFemaleData] = useState({})
    const [conclusion, setConclusion] = useState({})

    const [enableLoader, setEnableLoader] = useState(true)

    const fetchMatchingData = () => {
        setEnableLoader(true)
        const headers = getCommonHeaders()

        const url = "matchManglikReport"

        const body = KundaliBody(propsData, url, [], 4)

        apis
            .getKundaliDetails(body, headers)
            .then((response) => response.data)
            .then((data) => {
                if (!data.code) {
                    console.log(data)
                    // setKootData(data)
                    setBasicMaleData(data.male)
                    setBasicFemaleData(data.female)
                    setConclusion(data.conclusion)
                    setEnableLoader(false)
                }
            })
            .catch((error) => {
                console.log(error)
                setEnableLoader(false)
            })
    }

    useEffect(() => {
        console.log(propsData.maleName)
        console.log(propsData.femaleName)
        fetchMatchingData()
    }, [])

    return (
        <div className='mt-5'>
            {enableLoader ? <Loading /> : null}

            <div className='conclusion-box'>
                <div className='conclusion-title color-head'>{t('Manglik Analysis')}</div>
                <div className='conclusion-content-space'>
                    <div className='male'>
                        <div className='circle first'>
                            {propsData.maleName.substr(0, 2).toUpperCase()}
                        </div>
                        <div>{propsData.maleName}</div>
                    </div>
                    <div className='male'>
                        <div className='circle second'>
                            {propsData.femaleName.substr(0, 2).toUpperCase()}
                        </div>
                        <div>{propsData.femaleName}</div>
                    </div>
                </div>
            </div>

            <div className='conclusion-box'>
                <div className='conclusion-title color-head'>{t('Conclusion')}</div>
                <div className='conclusion-content'>
                    {(conclusion) &&
                        <div className='conclusion-result'>
                            {conclusion.report}
                        </div>
                    }
                </div>
            </div>

            <div className='conclusion-box' onClick={() => {
                history.push({
                    pathname: FRONTEND_NAME + "/chatList",
                    state: { typeOfService: "Chat" }
                })
            }}>
                <div className='conclusion-content'>
                    <div className='conclusion-sign'>
                    </div>
                    <div className='conclusion-result'>
                        <p style={{ fontWeight: '600', color: 'black' }}>{t('Do you have any doubts ?')}</p>
                        {t('Connect with an expert astrologer & get any accurate reading.')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManglikReport;