import { useEffect, useState } from 'react'
import KundaliNav from '../common/KundaliNav'
import KundaliTable from '../common/KundaliTable'
import Loading from "./loader"

//API
import { getCommonHeaders } from "../configuration/commonFunctions"
import apis from "../configuration/apis"
import {KundaliBody} from "../configuration/kundaliBody"
import moment from 'moment'

const Basic = (props) => {

    const propsData = props.kundaliData

    // alert(JSON.stringify(props.kundaliData))

    //Sub-Header
    const headerData = [
        "Birth Details",
        "Panchang Details",
        "Avakhada Details",
    ]

    const [selectedMenu, setSelectedMenu] = useState("Birth Details")

    const [kundaliD, setKundaliD] = useState({})

    const [enableLoader, setEnableLoader] = useState(true)

    const changesKundaliMenu = (option) => {
        setSelectedMenu(option)
    }

    const fetchKundaliData = () => {
               
        setEnableLoader(true)

        const headers = getCommonHeaders()

        // const body = {
        //     apiName: "birthDetails",
        //     requestBody:{"day":12,"month":3,"year":1992,"hour":2,"min":23,"lat":19.132,"lon":72.342,"tzone":5.5},
        //     headers:{},
        //     queryParameters:{}
        //     // day : 10,
        //     // month : 12,
        //     // year : 1996,
        //     // hour : 13,
        //     // min : 5,
        //     // lat : 19.132,
        //     // lon : 72.342,
        //     // tzone : 5.5
        // }

        // let url = "https://json.astrologyapi.com/v1/birth_details"
        let url = "birthDetails"
        
        if (selectedMenu === 'Birth Details') url = "birthDetails"
        else if (selectedMenu === 'Panchang Details') url = "basicPanchang"
        else if (selectedMenu === 'Avakhada Details') url = "astroDetails"
 
        const body = KundaliBody(propsData, url, [], 1)
        console.log(propsData)
        console.log(body)

        // const body = {
        //     apiName: url,
        //     requestBody:{"day":12,"month":3,"year":1992,"hour":2,"min":23,"lat":19.132,"lon":72.342,"tzone":5.5},
        //     headers:{},
        //     queryParameters:{}
        // }

        apis
            .getKundaliDetails(body, headers)
            .then((response) => response.data)
            .then((data) => {
                if (!data.code) {
                    console.log(data)
                    let pushData = {}
                    if(selectedMenu === 'Panchang Details') {
                        // pushData.Tithi = data.tithi
                        // pushData.Karan = data.karan
                        // pushData.Yog = data.yog
                        // pushData.Nakshatra = data.nakshatra
                        // pushData.Sunrise = data.sunrise
                        // pushData.Sunset = data.sunset
                        delete data.day
                        delete data.vedic_sunrise
                        delete data.vedic_sunset
                        setKundaliD(data)
                    }
                    else if(selectedMenu === 'Avakhada Details') {
                        data["Name alphabet"] = data.name_alphabet
                        data["Sign Lord"] = data.SignLord
                        data["Naksahtra-Charan"] = data.Naksahtra
                        delete data.SignLord
                        delete data.Naksahtra
                        delete data.name_alphabet
                        delete data.Charan
                        delete data.ascendant
                        delete data.ascendant_lord
                        delete data.NaksahtraLord
                        setKundaliD(data)
                    }
                    else {
                        // data["Naksahtra-Charan"] = data.Naksahtra
                        pushData.Name = propsData.name
                        pushData.Date = moment(propsData.birthDate).format('DD MMM yyyy')
                        pushData.Time = moment(propsData.birthTime).format('hh:mm A')
                        //pushData.Time = (data.hour + ":" + data.minute) 
                        pushData["Place of birth"] = propsData.placeOfBirth
                        pushData.latitude = data.latitude
                        pushData.longitude = data.longitude
                        pushData.timezone = data.timezone
                        pushData.sunrise = data.sunrise
                        pushData.sunset = data.sunset
                        pushData.ayanamsha = data.ayanamsha
                        setKundaliD(pushData)
                    }
                    // setKundaliD(data)    
                } 
                setEnableLoader(false)
            })
            .catch((error) => {
              console.log(error)
              setEnableLoader(false)
            })
    }

    useEffect(() => {
        fetchKundaliData()
    }, [selectedMenu])

    return (
        <>
            <KundaliNav 
                header={headerData} 
                selectedMenu={selectedMenu} 
                changesKundaliMenu={changesKundaliMenu} 
            />
            
            {enableLoader ? <Loading /> : null}

            <div className='row p-5'>
                <KundaliTable data={kundaliD}/>
            </div>
        </>
    )
}

export default Basic