import { useState, useEffect } from 'react'
import KundaliNav from '../common/KundaliNav'
import Loading from './loader'

//API
import { getCommonHeaders } from "../configuration/commonFunctions"
import apis from "../configuration/apis"
import {KundaliBody} from "../configuration/kundaliBody"

import { useTranslation } from "react-i18next"

const DivisionalChart = (props) => {
    
    const propsData = props.kundaliData

    //Translation 
    const [t]= useTranslation()
    
    const headerData = {
        "Chalit": "chalit",
        "Sun": "SUN",
        "Moon": "MOON",
        "Hora (D-2)": "D2",
        "Drekkana (d-3)": "D3",
        "Chaturthamsa (D-4)": "D4",
        "Saptamsa (D-7)": "D7",
        "Dasamsa (D-10)": "D10",
        "Dwadasamsa (D-12)": "D12",
        "Shodasamsa (D_16)": "D16",
        "Vimsamsa (D-20)": "D20",
        "Chaturvimsamsa (D-4)": "D4",
        "Saptavimsamsa": "D7",
        "Trimsamsa (D-30)": "D30",
        "Khavedamsa (D-40)": "D40",
        "Akshavedamsa (D-45)": "D45",
        "Shashtyamsa (D-60)": "D60"
    }

    const [selectedMenu, setSelectedMenu] = useState('Chalit')

    const [kundaliD, setKundaliD] = useState('')
    
    const [enableLoader, setEnableLoader] = useState(true)

    const fetchKundaliData = () => {
        
        setEnableLoader(true)

        const headers = getCommonHeaders()

        let url = "horoChartImage"

        const body = KundaliBody(propsData, url, [headerData[selectedMenu]], 1)

        apis
            .getKundaliDetails(body, headers)
            .then((response) => response.data)
            .then((data) => {
                if (!data.code) {
                    if (data.svg === undefined) setKundaliD(data)
                    else setKundaliD(data.svg)
                    
                    console.log(kundaliD)
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
    }, [selectedMenu])

    const changesKundaliMenu = (option) => {
        setSelectedMenu(option)
    }

    return (
        <>
            <KundaliNav 
                header={Object.keys(headerData)} 
                selectedMenu={selectedMenu}
                isChart={true} 
                changesKundaliMenu={changesKundaliMenu} 
            />

            {enableLoader ? <Loading /> : null}

            <div style={{marginTop: '20px'}}>
                <span dangerouslySetInnerHTML={{__html: kundaliD}} />
            </div>
            
        </>
    )
}

export default DivisionalChart