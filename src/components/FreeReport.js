import { useEffect, useState } from 'react'
import KundaliNav from '../common/KundaliNav'
import fastForward from '../images/fastForward.svg'
import downForward from '../images/downForward.svg'

import { getCommonHeaders } from "../configuration/commonFunctions"
import apis from "../configuration/apis"
import {KundaliBody} from "../configuration/kundaliBody"
import Loading from './loader'
import User from "../images/user.svg"

// import ReactPDF, { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
// import KundaliPdf from './kundaliPdf'

import {useHistory} from 'react-router-dom'


const FreeReport = (props) => {
    
    const history = useHistory()

    const headerData = [
        "Planetary",
        "Yoga",
        "Manglik",
        "Vimshottari Dasha"
    ]

    const propsData = props.kundaliData

    const [selectedAccord, setSelectedAccord] = useState(1)

    const changeAccord = (id) => {
        if (id === selectedAccord) {
            setSelectedAccord()
        }
        else setSelectedAccord(id)
    }

    const [selectedMenu, setSelectedMenu] = useState("Planetary")

    const [enableLoader, setEnableLoader] = useState(true)

    const [kundaliD, setKundaliD] = useState([])

    // const [manglik, setKundaliD] = useState([])

    const changesKundaliMenu = (option) => {
        setSelectedMenu(option)
    }
    
    const fetchKundaliData = () => {
        setEnableLoader(true)
        const headers = getCommonHeaders()

        // let url = "https://json.astrologyapi.com/v1/birth_details"
        let url = "matchManglikReport"
        
        // const body = {
        //     apiName: url,
        //     requestBody:{"day":12,"month":3,"year":1992,"hour":2,"min":23,"lat":19.132,"lon":72.342,"tzone":5.5},
        //     headers:{},
        //     queryParameters:{}
        // }

        let body = KundaliBody(propsData, url, [], 2)

        if (selectedMenu === 'Planetary') {
            url = 'generalAscendantReport'
            body = KundaliBody(propsData, url, [], 1)
        }

        apis
            .getKundaliDetails(body, headers)
            .then((response) => response.data)
            .then((data) => {
                console.log("Kundali Data ", data)
                if (selectedMenu === 'Manglik') {
                    let tempMangalik = []
                    const kundaliData = JSON.parse(localStorage.getItem('kundaliData'))[0]

                    tempMangalik.push({
                        title: 'Mangalik Analysis',
                        date: '',
                        content: kundaliData.name,
                        id: 'Mangalik Analysis'
                    })
                    tempMangalik.push({
                        title: 'Conclusion',
                        date: '',
                        content: data.male.manglik_report,
                        id: 'Conclusion'
                    })
                    setKundaliD(tempMangalik)
                }
                else if (selectedMenu === 'Planetary') {
                    let tempMangalik = []
                    console.log("Without Removed", data.asc_report.report)
                    console.log("Removed", data.asc_report.report.replaceAll('<p>', '').replaceAll('</p>', ''))

                    tempMangalik.push({
                        title: data.asc_report.ascendant,
                        date: '',
                        content: data.asc_report.report.replaceAll('<p>', '').replaceAll('</p>', ''),
                        id: 'Planetary'
                    })
                    setKundaliD(tempMangalik)

                }
                setEnableLoader(false)
            })
            .catch((error) => {
              console.log(error)
              setEnableLoader(false)
            })
    }

    const fetchYogaData = () => {
        setEnableLoader(true)
        const headers = getCommonHeaders()
        let url = "generalHouseReport"
        let dataFetch = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn']

        if (selectedMenu === 'Vimshottari Dasha') {
            url = 'generalRashiReport'
            dataFetch = ['moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn']
        }

        var tempKundaliData = []
                    
        dataFetch.forEach((category, index) => {
            let body = KundaliBody(propsData, url, [category], 1)
            apis
                .getKundaliDetails(body, headers)
                .then((response) => response.data)
                .then((data) => {
                    if (!data.code) {
                        tempKundaliData.push({
                            title: data.planet,
                            date: '',
                            content: selectedMenu === 'Yoga' ? data.house_report.replaceAll('<p>', '').replaceAll('</p>', '') : data.rashi_report.replaceAll('<p>', '').replaceAll('</p>', ''),
                            id: data.planet
                        })
                        // setKundaliD(tempMangalik)
                        // setEnableLoader(false)
                        // console.log(data)
                        if ((selectedMenu === 'Yoga' && index === 6)
                            || (selectedMenu === 'Vimshottari Dasha' && index === 5)
                        ) {
                            setKundaliD(tempKundaliData)
                            setEnableLoader(false)   
                        }
                    }
                })
                .catch((error) => {
                  // console.log(error)
                  setEnableLoader(false)
                }) 
            //console.log(category + " : " + index)
        })
        // console.log(tempKundaliData)
        // console.log(kundaliD)     
    }
    
    useEffect(() => {
        if (selectedMenu === 'Manglik') {
            changeAccord('Mangalik Analysis')
            fetchKundaliData()
        }
        else if (selectedMenu === 'Planetary') {
            changeAccord('Planetary')
            fetchKundaliData()
        }
        else if (selectedMenu === 'Yoga') {
            changeAccord('Sun')
            fetchYogaData()
        }
        else if (selectedMenu === 'Vimshottari Dasha') {
            changeAccord('Moon')
            fetchYogaData()
        }
    }, [selectedMenu])

    return (
        <>
            <KundaliNav 
                header={headerData} 
                selectedMenu={selectedMenu} 
                changesKundaliMenu={changesKundaliMenu} 
            />

            {enableLoader ? <Loading /> : null}

            <div className="row" style={{marginTop: '50px'}}>
                <div className="col-md-12">
                    {/* <button
                        onClick={() => {
                            history.push({
                                pathname: '/astrology/reportrender',
                                state: { kundaliData: propsData
                                }
                            })
                        }}
                        style={{
                            linkDecoration: 'none',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            paddingTop: '5px',
                            paddingBottom: '5px',
                            border: '1px solid black',
                            borderRadius: '4px',
                            color: 'black'
                        }}
                    >Preview &amp; Download Kundali Data</button> */}
                    {
                        kundaliD && kundaliD.map(
                            data => (
                                <div className="accordin" onClick={() => changeAccord(data.id)}>
                                    <div className="title">
                                        <div style={{width: '95%', display: 'flex', justifyContent: 'flex-start', marginLeft: '10px'}}>
                                            {data.title} 
                                            {data.date}
                                        </div>
                                        <div>
                                            {(selectedAccord === data.id)&&<img src={fastForward} alt='forward' />}
                                            {(selectedAccord !== data.id)&&<img src={downForward} alt='downword' />}
                                        </div>
                                    </div>
                                    <div className={(selectedAccord && selectedAccord === data.id) ? (selectedMenu === 'Manglik' && data.id === 'Mangalik Analysis') ? "description-show text-align" : "description-show" : "description-hide"}>
                                        {(data.id === 'Mangalik Analysis') && <img className="user" src={User} alt='user' />} <span dangerouslySetInnerHTML={{__html: data.content}}></span>{data.content}
                                    </div>
                                </div>
                            )
                    )}

                    {/* {selectedMenu && selectedMenu === 'Mangliik' && (
                            <>
                                <div className="accordin" onClick={() => changeAccord(kundaliD[0].phone)}>
                                    <div className="title">
                                        <div style={{width: '95%', display: 'flex', justifyContent: 'flex-start', marginLeft: '10px'}}>
                                            Mangalik Analysis
                                        </div>
                                        <div>
                                            {(selectedAccord === kundaliD[0].phone)&&<img src={fastForward} />}
                                            {(selectedAccord !== kundaliD[0].phone)&&<img src={downForward} />}
                                        </div>
                                    </div>
                                    <div className={(selectedAccord && selectedAccord === kundaliD[0].phone) ? "description-show" : "description-hide"}>
                                        {kundaliD[0].name}
                                    </div>
                                </div>
                                <div className="accordin" onClick={() => changeAccord(kundaliD[0].phone + 1)}>
                                    <div className="title">
                                        <div style={{width: '95%', display: 'flex', justifyContent: 'flex-start', marginLeft: '10px'}}>
                                            Conclusion
                                        </div>
                                        <div>
                                            {(selectedAccord === kundaliD[0].phone + 1)&&<img src={fastForward} />}
                                            {(selectedAccord !== kundaliD[0].phone + 1)&&<img src={downForward} />}
                                        </div>
                                    </div>
                                    <div className={(selectedAccord && selectedAccord === kundaliD[0].phone + 1) ? "description-show" : "description-hide"}>
                                        {kundaliD[1].male.manglik_report}
                                    </div>
                                </div>
                            </>
                        )
                    } */}
                </div>
            </div>

        </>
    )
}

export default FreeReport