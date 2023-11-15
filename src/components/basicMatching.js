import { useState, useEffect } from 'react'
// import KundaliNav from '../common/KundaliNav'
// import moment from 'moment'

//API
import { getCommonHeaders } from "../configuration/commonFunctions"
import apis from "../configuration/apis"
import { KundaliBody } from "../configuration/kundaliBody"
import Loading from './loader'

import { useTranslation } from "react-i18next"

const BasicMatching = (props) => {

    const propsData = props.kundaliData
    //Translation 
    const [t] = useTranslation()

    const [basicMaleData, setBasicMaleData] = useState([])
    const [basicFemaleData, setBasicFemaleData] = useState([])

    const [enableLoader, setEnableLoader] = useState(true)

    const fetchMatchingData = () => {
        setEnableLoader(true)
        const headers = getCommonHeaders()

        const url = "matchAstroDetails"

        const body = KundaliBody(propsData, url, [], 4)

        apis
            .getKundaliDetails(body, headers)
            .then((response) => response.data)
            .then((data) => {
                if (!data.code) {
                    console.log(data)
                    // setKootData(data)
                    setBasicMaleData(data.male_astro_details)
                    setBasicFemaleData(data.female_astro_details)
                    setEnableLoader(false)
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
                    <th scope="col">{t('Male')}</th>
                    <th scope="col">{t('Female')}</th>
                </thead>
                <tbody>
                    {
                        basicMaleData && Object.keys(basicMaleData).filter(key => key !== 'name_alphabet'
                            && key !== 'ascendant'
                            && key !== 'sign'
                            && key !== 'yunja'
                            && key !== 'paya'
                            && key !== 'tatva'
                        ).map((key, index) => (
                            <tr key={key}>
                                <td>{t(key)}</td>
                                <td>{basicMaleData[key]}</td>
                                <td>{basicFemaleData[key]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </>
    )
}

export default BasicMatching;