import { useState, useEffect } from 'react'
import KundaliNav from '../common/KundaliNav'

import { getCommonHeaders } from "../configuration/commonFunctions"
import apis from "../configuration/apis"
import {KundaliBody} from "../configuration/kundaliBody"
import Loading from './loader'
import { useTranslation } from "react-i18next"

const Planets = (props) => { 

    const propsData = props.kundaliData

    const headerData = [
        "Nakshatra",
        "Sign"
    ]

    //Translation 
    const [t]= useTranslation();

    const [selectedMenu, setSelectedMenu] = useState('Nakshatra')

    const [kundaliD, setKundaliD] = useState([])

    const [enableLoader, setEnableLoader] = useState(true)

    const changesKundaliMenu = (option) => {
        setSelectedMenu(option)
    }

    const fetchKundaliData = () => {
        setEnableLoader(true)
        const headers = getCommonHeaders()

        // let url = "https://json.astrologyapi.com/v1/birth_details"
        let url = "planets"
        
        // const body = {
        //     apiName: url,
        //     requestBody:{"day":12,"month":3,"year":1992,"hour":2,"min":23,"lat":19.132,"lon":72.342,"tzone":5.5},
        //     headers:{},
        //     queryParameters:{}
        // }

        const body = KundaliBody(propsData, url, [], 1)

        apis
            .getKundaliDetails(body, headers)
            .then((response) => response.data)
            .then((data) => {
                if (!data.code) {
                    console.log(data)
                    // alert(JSON.stringify(data))
                    setKundaliD(data)
                    setEnableLoader(false)
                }
            })
            .catch((error) => {
              console.log(error)
              setEnableLoader(false)
            })
    }

    useEffect(() => {
        fetchKundaliData()
    }, [])

    return (
        <>
            <KundaliNav 
                header={headerData} 
                selectedMenu={selectedMenu} 
                changesKundaliMenu={changesKundaliMenu} 
            />

            {enableLoader ? <Loading /> : null}

            <div className="row mt-5">
                <div className="col-md-12">
                    <table class="table table-striped">
                        <thead>
                            <th scope="col">{t('Planet')}</th>
                            <th scope="col">{selectedMenu === 'Nakshatra' ? t('Nakshatra') : t('Sign')}</th>
                            <th scope="col">{selectedMenu === 'Nakshatra' ? t('Naksh Lord') : t('Sign Lord')}</th>
                            <th scope="col">{t('Degree')}</th>
                            <th scope="col">{t('House')}</th>
                        </thead>
                        <tbody>
                            {
                                kundaliD && kundaliD.map(d => (
                                    <tr>
                                        <td>{d.name}</td>
                                        <td>{selectedMenu === 'Nakshatra' ? d.nakshatra : d.sign}</td>
                                        <td>{selectedMenu === 'Nakshatra' ? d.nakshatraLord : d.signLord}</td>
                                        <td>{d.fullDegree}</td>
                                        <td>{d.house}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Planets