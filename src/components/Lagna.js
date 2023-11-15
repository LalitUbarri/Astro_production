import { useState, useEffect } from 'react'
import KundaliNav from '../common/KundaliNav'
import Loading from './loader'

//API
import { getCommonHeaders } from "../configuration/commonFunctions"
import apis from "../configuration/apis"
import {KundaliBody} from "../configuration/kundaliBody"


const Lagna = (props) => {
    
    const propsData = props.kundaliData

    const headerData = [
        "Lagna/Ascendant/D1 Chart"
    ]
    
    const [selectedMenu, setSelectedMenu] = useState("Lagna/Ascendant/D1 Chart")

    const [kundaliD, setKundaliD] = useState('')
    
    const [enableLoader, setEnableLoader] = useState(true)

    const changesKundaliMenu = (option) => {
        setSelectedMenu(option)
    }
    
    const fetchKundaliData = () => {
        setEnableLoader(true)
        // propsData
        const headers = getCommonHeaders()

        let url = "horoChartImage"
        
        const body = KundaliBody(propsData, url, ["D"], 1)

        apis
            .getKundaliDetails(body, headers)
            .then((response) => response.data)
            .then((data) => {
                if (!data.code) {
                    console.log(data)
                    setKundaliD(data.svg)
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

            <div style={{marginTop: '20px'}}>
                <span dangerouslySetInnerHTML={{__html: kundaliD}} />
            </div>
            
            {/* {kundaliD} */}
        </>
    )
}

export default Lagna;