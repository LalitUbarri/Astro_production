import { useState, useEffect } from 'react'
// import KundaliNav from '../common/KundaliNav'
// import moment from 'moment'

//API
import { getCommonHeaders } from "../configuration/commonFunctions"
import apis from "../configuration/apis"
import {KundaliBody} from "../configuration/kundaliBody"
import Loading from './loader'

import { useTranslation } from "react-i18next"

const Dasha = (props) => {
    
    const propsData = props.kundaliData

    const headerData = [
        "Maha dasha",
        "Antar dasha",
        "Pratyantar dasha",
        "Sookshma dasha"
    ]

    //Translation 
    const [t]= useTranslation()

    const [selectedMenu, setSelectedMenu] = useState('Maha dasha')

    const [kundaliD, setKundaliD] = useState([])

    const [selectedDasha, setSelectedDasha] = useState([])

    const [enableLoader, setEnableLoader] = useState(true)

    const changesKundaliMenu = (option) => {
        setSelectedMenu(option)
    }

    const fetchKundaliData = () => {
        setEnableLoader(true)
        const headers = getCommonHeaders()
        
        let url = "majorVdasha"

        let body = KundaliBody(propsData, url, [], 1)
        if (selectedDasha.length === 1) {
            url = 'subVdasha'
            body = KundaliBody(propsData, url, selectedDasha, 1)
        }
        else if (selectedDasha.length === 2) {
            url = 'subSubVdasha'
            body = KundaliBody(propsData, url, selectedDasha, 1)
        }
        else if (selectedDasha.length === 3) {
            url = 'subSubSubVdasha'
            body = KundaliBody(propsData, url, selectedDasha, 1)
        }
        else if (selectedDasha.length > 3) {
            setEnableLoader(false)
            return;
        }

        apis
            .getKundaliDetails(body, headers)
            .then((response) => response.data)
            .then((data) => {
                if (!data.code) {
                    console.log(data)
                    setKundaliD(data)
                    setEnableLoader(false)
                }
            })
            .catch((error) => {
              console.log(error)
              setEnableLoader(false)
            })
    }

    const fetchClicked = (data) => {
        if (selectedDasha.length >= 3) return
        let tempDasha = selectedDasha
        tempDasha.push(data)
        setSelectedDasha(tempDasha)
        fetchKundaliData()
    }

    useEffect(() => {
        fetchKundaliData()
    }, [selectedMenu])
    
    return (
        <>
            <div className="Dasha mt-3" >    
                {headerData && headerData.map((a, index) => (
                    <>    {selectedDasha.length >= index && t(a) + '>'}
                    </>
                ))}
            </div>
            
            {enableLoader ? <Loading /> : null}
            
            <div className="row mt-5">
                <div className="col-md-12">
                    <table class="table table-striped">
                        <thead>
                            <th scope="col">{t('Planet')}</th>
                            <th scope="col">{t('Start Date')}</th>
                            <th scope="col">{t('End Date')}</th>
                        </thead>
                        <tbody>
                            {
                                kundaliD && kundaliD.map(d => (
                                    <tr key={d.planet_id} onClick={() => {fetchClicked(d.planet)}}>
                                        <td>{t(d.planet)}</td>
                                        <td>{d.start.split(" ")[0]}</td>
                                        <td>{d.end.split(" ")[0]}</td>
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

export default Dasha;