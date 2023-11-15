import { useState, useEffect } from 'react'
// import KundaliNav from '../common/KundaliNav'
// import moment from 'moment'

//API
import { getCommonHeaders } from "../configuration/commonFunctions"
import apis from "../configuration/apis"
import { KundaliBody } from "../configuration/kundaliBody"
import Loading from './loader'

import { useTranslation } from "react-i18next"

import CircularProgressWithLabel from "./CircularProgressWithLabel"
import { useHistory } from 'react-router-dom'
import { FRONTEND_NAME } from "../configuration/constants"

const Koot = (props) => {

    const history = useHistory()
    const propsData = props.kundaliData
    const pageSection = props.pageSection
    const totalPoint = 36
    const [conclusionPercentage, setConclusionPercentage] = useState(0)

    //Translation 
    const [t] = useTranslation()

    const [kootData, setKootData] = useState([])

    const [enableLoader, setEnableLoader] = useState(true)

    const fetchMatchingData = () => {
        setEnableLoader(true)
        const headers = getCommonHeaders()

        const url = pageSection === 'ashtakot' ? "matchAshtakootPoints" : "matchDashakootPoints"

        const body = KundaliBody(propsData, url, [], 4)

        apis
            .getKundaliDetails(body, headers)
            .then((response) => response.data)
            .then((data) => {
                if (!data.code) {
                    console.log(data)
                    setKootData(data)
                    setEnableLoader(false)
                    setConclusionPercentage((data['total'].received_points / totalPoint) * 100)
                }
            })
            .catch((error) => {
                console.log(error)
                setEnableLoader(false)
            })
    }

    useEffect(() => {
        fetchMatchingData()
    }, [])

    return (
        <>

            {enableLoader ? <Loading /> : null}



            <table class="table table-striped">
                <thead>
                    <th scope="col">{t('Attribute')}</th>
                    <th scope="col">{t('Description')}</th>
                    <th scope="col">{t('Matching Points')}</th>
                </thead>
                <tbody>
                    {
                        kootData && Object.keys(kootData).filter(key => key !== 'conclusion').map((key, index) => (
                            <tr key={key}>
                                <td>{t(key)}</td>
                                <td>{kootData[key].description || pageSection !== 'ashtakot' ? kootData[key].description : '-'}</td>
                                <td>{kootData[key].received_points} / {kootData[key].total_points}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className='conclusion-box'>
                <div className='conclusion-title'>{t('Conclusion')}</div>
                <div className='conclusion-content'>

                    {
                        (kootData && kootData['conclusion']) ?
                            <>
                                <div className='conclusion-sign'>
                                    <CircularProgressWithLabel value={conclusionPercentage} />
                                </div>
                                <div className='conclusion-result'>
                                    {kootData['conclusion'].report}
                                </div>
                            </> :
                            <>
                                <div className='conclusion-sign'>
                                    <CircularProgressWithLabel value={conclusionPercentage} />
                                </div>
                                <div className='conclusion-result' onClick={() => {
                                    history.push({
                                        pathname: FRONTEND_NAME + "/chatList",
                                        state: { typeOfService: "Chat" }
                                    })
                                }}>
                                    {t('dakshkoot_report')}
                                </div>
                            </>
                    }
                </div>
            </div>

        </>
    )
}

export default Koot;