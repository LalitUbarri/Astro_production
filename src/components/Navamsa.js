import { useState, useEffect } from 'react'
import KundaliNav from '../common/KundaliNav'
import Loading from './loader'

//API
import { getCommonHeaders } from "../configuration/commonFunctions"
import apis from "../configuration/apis"
import {KundaliBody} from "../configuration/kundaliBody"

const Navamsa = (props) => {
    
    const propsData = props.kundaliData

    const headerData = [
        "Navamsa Chart"
    ]
    
    const [selectedMenu, setSelectedMenu] = useState("Navamsa Chart")

    const [kundaliD, setKundaliD] = useState('')
    
    const [enableLoader, setEnableLoader] = useState(true)

    const fetchKundaliData = () => {
        
        setEnableLoader(true)

        const headers = getCommonHeaders()

        let url = "horoChartImage"

        const body = KundaliBody(propsData, url, ["D9"], 1)

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

    const changesKundaliMenu = (option) => {
        setSelectedMenu(option)
    }
    
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
        </>
    )
}

export default Navamsa;