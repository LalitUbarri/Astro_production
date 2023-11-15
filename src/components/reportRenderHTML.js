import React, { useState, useEffect } from 'react' 
import moment from 'moment'
//API
import { getCommonHeaders } from "../configuration/commonFunctions"
import apis from "../configuration/apis"
import {KundaliBodyPDF} from "../configuration/kundaliBody"
import axios from 'axios'

import Loading from './loader'
import Logo from '../images/newImages/WhatsApp-Image-2021-08-02-a.png'

import { useTranslation } from "react-i18next";

const ReportRender = (props) => {

    const [enableLoader, setEnableLoader] = useState(true)
    
    const [t]= useTranslation();

    //const propsData = JSON.parse(localStorage.getItem('kundaliData'))[0]
    const propsData = props.location.state.kundaliData

    const [kundaliD, setKundaliD] = useState({})

    //alert('data:image/svg+xml;base64,' + btoa(svg))

    const fetchMultiData = () => {

        let requestObj = []
        // const headers = getCommonHeaders()
        let headers = {
            'Authorization': 'Basic NjE5MjY1OjcwMDJiYTU2MzM2YjFkYmI1MDRmOGJiZTc3YzJhOWYy'
        }
        if (localStorage.getItem('selectedLanguage') && localStorage.getItem('selectedLanguage') === 'hi') {
            headers = {
            'Authorization': 'Basic NjE5MjY1OjcwMDJiYTU2MzM2YjFkYmI1MDRmOGJiZTc3YzJhOWYy',
            'Accept-Language': 'hi'        
            }
        }
        const menu = ["birth_details", "basic_panchang", "astro_details", "planets", "major_chardasha", "major_yogini_dasha", "match_manglik_report", 'general_ascendant_report',
        'general_house_report', 'general_rashi_report', 'major_vdasha', 'sub_vdasha', 'sub_sub_vdasha', 'sub_sub_sub_vdasha', 'horo_chart_image', 'planet_ashtak']
        
        // let urll = "generalHouseReport"
        //    url = 'generalRashiReport'

        // let url = 'http://14.99.239.245:8080/FlexPlatform/getResponse'

        let url = 'https://json.astrologyapi.com/v1/'
        let dataFetch = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn']
        let dataFetch2 = ['moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn']
        let dataDasha = ['moon','mars', 'rahu','jupiter', 'saturn', 'mercury', 'ketu', 'venus', 'sun']
        const dataAstak = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn' , 'ascendant']

        menu.forEach(m => {

            let body = KundaliBodyPDF(propsData, m, [], 1)
            if (m === 'match_manglik_report') {
                body = KundaliBodyPDF(propsData, m, [], 2)
                requestObj.push(axios.post(url + m + '/', body, { headers }))
            }
            else if (m === 'sub_vdasha') {
                body = KundaliBodyPDF(propsData, m, ['moon'], 1)
                dataDasha.forEach(dasha => {
                    requestObj.push(axios.post(url + m + '/' + dasha, body, { headers }))
                })
            } 
            else if (m === 'sub_sub_vdasha') {
                body = KundaliBodyPDF(propsData, m, ['moon', 'moon'], 1)
                dataDasha.forEach(dasha1 => {
                    dataDasha.forEach(dasha2 => {
                        requestObj.push(axios.post(url + m + '/' + dasha1 + '/' + dasha2, body, { headers }))
                    })
                })
                //requestObj.push(axios.post(url + m + '/moon/moon', body, { headers }))                
            } 
            else if (m === 'sub_sub_sub_vdasha') {
                body = KundaliBodyPDF(propsData, m, ['moon', 'moon', 'moon'], 1)  
                requestObj.push(axios.post(url + 'sub_sub_sub_vdasha' + '/moon/moon/moon' , body, { headers }))              
            } 
            else if (m === 'horo_chart_image') {
                let chartType = ['D1', 'D9', 'chalit', 'SUN', 'MOON', 'D2','D3', 'D4', 'D7','D10','D12', 'D16', 'D20','D30','D40','D45','D60']
                chartType.forEach(dd => {
                    let body = KundaliBodyPDF(propsData, m, [dd], 1)
                    requestObj.push(axios.post((url+ 'horo_chart_image' + '/' + dd), body, { headers }))
                })
            }
             else if (m === 'planet_ashtak') {
                dataAstak.forEach(dd => {
                    let body = KundaliBodyPDF(propsData, m, [dd], 1)
                    requestObj.push(axios.post((url+ m + '/' + dd), body, { headers }))
                })
            }

        
            // if (selectedMenu === 'Vimshottari Dasha') {
            //     url = 'generalRashiReport'
            //     dataFetch = ['moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn']
            // }
            else if (m === 'general_house_report') {
                dataFetch.forEach(dd => {
                    let body = KundaliBodyPDF(propsData, m, [dd], 1)
                    requestObj.push(axios.post(url+ m + '/' + dd, body, { headers }))
                })
            }
            else if (m === 'general_rashi_report') {
                dataFetch2.forEach(dd => {
                    let body = KundaliBodyPDF(propsData, m, [dd], 1)
                    requestObj.push(axios.post(url + m + '/' + dd, body, { headers }))
                })
            }
            else requestObj.push(axios.post(url+m, body, { headers }))
        })
        
        console.log(requestObj)

        //let dataDasha = ['moon','mars', 'rahu','jupiter', 'saturn', 'mercury', 'ketu', 'venus', 'sun']
        
        axios.all(requestObj).then(
            axios.spread((respOne, respTwo, resthree, planets, majorChardasha, majorYoginiDasha, matchManglikReport, generalAscendantReport, sun, moon, mars, mercury, jupiter, venus, saturn, moon2, mars2, mercury2, jupiter2, venus2, saturn2, majorVdasha, 
                subVdashaMoon,subVdashaMars,subVdashaRahu,subVdashaJupiter,subVdashaSaturn,subVdashaMercury,subVdashaKetu,subVdashaVenus,subVdashaSun,
                subVdashaMoonMoon,subVdashaMarsMoon,subVdashaRahuMoon,subVdashaJupiterMoon,subVdashaSaturnMoon,subVdashaMercuryMoon,subVdashaKetuMoon,subVdashaVenusMoon,subVdashaSunMoon,
                subVdashaMoonMars,subVdashaMarsMars,subVdashaRahuMars,subVdashaJupiterMars,subVdashaSaturnMars,subVdashaMercuryMars,subVdashaKetuMars,subVdashaVenusMars,subVdashaSunMars,
                subVdashaMoonRahu,subVdashaMarsRahu,subVdashaRahuRahu,subVdashaJupiterRahu,subVdashaSaturnRahu,subVdashaMercuryRahu,subVdashaKetuRahu,subVdashaVenusRahu,subVdashaSunRahu,
                subVdashaMoonJupiter,subVdashaMarsJupiter,subVdashaRahuJupiter,subVdashaJupiterJupiter,subVdashaSaturnJupiter,subVdashaMercuryJupiter,subVdashaKetuJupiter,subVdashaVenusJupiter,subVdashaSunJupiter,
                subVdashaMoonSaturn,subVdashaMarsSaturn,subVdashaRahuSaturn,subVdashaJupiterSaturn,subVdashaSaturnSaturn,subVdashaMercurySaturn,subVdashaKetuSaturn,subVdashaVenusSaturn,subVdashaSunSaturn,
                subVdashaMoonMercury,subVdashaMarsMercury,subVdashaRahuMercury,subVdashaJupiterMercury,subVdashaSaturnMercury,subVdashaMercuryMercury,subVdashaKetuMercury,subVdashaVenusMercury,subVdashaSunMercury,
                subVdashaMoonKetu,subVdashaMarsKetu,subVdashaRahuKetu,subVdashaJupiterKetu,subVdashaSaturnKetu,subVdashaMercuryKetu,subVdashaKetuKetu,subVdashaVenusKetu,subVdashaSunKetu,
                subVdashaMoonVenus,subVdashaMarsVenus,subVdashaRahuVenus,subVdashaJupiterVenus,subVdashaSaturnVenus,subVdashaMercuryVenus,subVdashaKetuVenus,subVdashaVenusVenus,subVdashaSunVenus,
                subVdashaMoonSun,subVdashaMarsSun,subVdashaRahuSun,subVdashaJupiterSun,subVdashaSaturnSun,subVdashaMercurySun,subVdashaKetuSun,subVdashaVenusSun,subVdashaSunSun,
                subSubSubVdasha, d1, d9,chalit, D_SUN, D_MOON, D2,D3, D4, D7,D10,D12, D16, D20,D30,D40,D45,D60, 
                planetAshtakSun, planetAshtakMoon, planetAshtakMars, planetAshtakMercury, planetAshtakJupiter, planetAshtakVenus, planetAshtakSaturn, planetAshtakAscendant) => {

                // console.log(respOne.data)
                // console.log(respTwo.data)
                // console.log(resthree.data)
                // console.log(sun.data)
                let pushData = {}
                let tempK = {}
                let generalHouseReport = []
                let generalRashiReport = []
                // {
                //     title: data.planet,
                //     date: '',
                //     content: selectedMenu === 'Yoga' ? data.house_report : data.rashi_report,
                //     id: data.planet
                // }
                
                delete respTwo.data.day
                delete respTwo.data.vedic_sunrise
                delete respTwo.data.vedic_sunset
                tempK.basicPanchang = respTwo.data
                
                resthree.data["Name alphabet"] = resthree.data.name_alphabet
                resthree.data["Sign Lord"] = resthree.data.SignLord
                resthree.data["Naksahtra-Charan"] = resthree.data.Naksahtra
                delete resthree.data.SignLord
                delete resthree.data.Naksahtra
                delete resthree.data.name_alphabet
                delete resthree.data.Charan
                delete resthree.data.ascendant
                delete resthree.data.ascendant_lord
                delete resthree.data.NaksahtraLord
                tempK.astroDetails = resthree.data
                
                pushData.Name = propsData.name
                pushData.Date = moment(propsData.birthDate).format('DD MMM yyyy')
                pushData.Time = moment(propsData.birthTime).format('hh:mm A')
                pushData.Place = propsData.placeOfBirth
                pushData.latitude = respOne.data.latitude
                pushData.longitude = respOne.data.longitude
                pushData.timezone = respOne.data.timezone
                pushData.sunrise = respOne.data.sunrise
                pushData.sunset = respOne.data.sunset
                pushData.ayanamsha = respOne.data.ayanamsha
                
                tempK.birthDetails = pushData
                tempK.planets = planets.data
                tempK.majorChardasha = majorChardasha.data 
                tempK.majorYoginiDasha = majorYoginiDasha.data 
                tempK.matchManglikReport = matchManglikReport.data 
                tempK.generalAscendantReport = generalAscendantReport.data 

                let planetArray = []
                planetArray.push(planetAshtakSun.data) 
                planetArray.push(planetAshtakMoon.data) 
                planetArray.push(planetAshtakMars.data )
                planetArray.push(planetAshtakMercury.data) 
                planetArray.push(planetAshtakJupiter.data )
                planetArray.push(planetAshtakVenus.data )
                planetArray.push(planetAshtakSaturn.data)
                planetArray.push(planetAshtakAscendant.data)

                tempK.planetAshtak = planetArray
                
                generalHouseReport.push({
                    title: sun.data.planet,
                    content: sun.data.house_report,
                    
                })
                generalHouseReport.push({
                    title: moon.data.planet,
                    content: moon.data.house_report,
                })
                generalHouseReport.push({
                    title: mars.data.planet,
                    content: mars.data.house_report,
                })
                generalHouseReport.push({
                    title: mercury.data.planet,
                    content: mercury.data.house_report,
                })
                generalHouseReport.push({
                    title: jupiter.data.planet,
                    content: jupiter.data.house_report,
                })
                generalHouseReport.push({
                    title: venus.data.planet,
                    content: venus.data.house_report,
                })
                generalHouseReport.push({
                    title: saturn.data.planet,
                    content: saturn.data.house_report,
                })

                generalRashiReport.push({
                    title: moon2.data.planet,
                    content: moon2.data.rashi_report,
                })
                generalRashiReport.push({
                    title: mars2.data.planet,
                    content: mars2.data.rashi_report,
                })
                generalRashiReport.push({
                    title: mercury2.data.planet,
                    content: mercury2.data.rashi_report,
                })
                generalRashiReport.push({
                    title: jupiter2.data.planet,
                    content: jupiter2.data.rashi_report,
                })
                generalRashiReport.push({
                    title: venus2.data.planet,
                    content: venus2.data.rashi_report,
                })
                generalRashiReport.push({
                    title: saturn2.data.planet,
                    content: saturn2.data.rashi_report,
                })
                
                tempK.generalHouseReport = generalHouseReport

                tempK.generalRashiReport = generalRashiReport

                tempK.majorVdasha = majorVdasha.data
                
                tempK.subVdashaMoon = subVdashaMoon.data
                tempK.subVdashaMars = subVdashaMars.data
                tempK.subVdashaRahu = subVdashaRahu.data
                tempK.subVdashaJupiter = subVdashaJupiter.data
                tempK.subVdashaSaturn = subVdashaSaturn.data
                tempK.subVdashaMercury = subVdashaMercury.data
                tempK.subVdashaKetu = subVdashaKetu.data
                tempK.subVdashaVenus = subVdashaVenus.data
                tempK.subVdashaSun = subVdashaSun.data
                
                tempK.subVdasha = subVdashaMoon.data
                
                // tempK.subSubVdasha = subSubVdasha.data
                tempK.subSubVdasha = subVdashaMoonMoon.data

                tempK.subSubSubVdasha = subSubSubVdasha.data

                tempK.d9 = d9.data.svg
                tempK.d1 = d1.data.svg

                //tempK.d9 = tempK
                tempK.chalit = chalit.data
                tempK.D_SUN = D_SUN.data.svg
                tempK.D_MOON = D_MOON.data.svg 
                tempK.D2 = D2.data.svg
                tempK.D3 = D3.data.svg 
                tempK.D4 = D4.data.svg 
                tempK.D7 = D7.data.svg
                tempK.D10 = D10.data.svg
                tempK.D12 = D12.data.svg 
                tempK.D16 = D16.data.svg 
                tempK.D20 = D20.data.svg
                tempK.D30 = D30.data.svg
                tempK.D40 = D40.data.svg
                tempK.D45 = D45.data.svg
                tempK.D60 = D60.data.svg

                tempK.subVdashaMoonMoon = subVdashaMoonMoon.data 
                tempK.subVdashaMarsMoon = subVdashaMarsMoon.data
                tempK.subVdashaRahuMoon = subVdashaRahuMoon.data
                tempK.subVdashaJupiterMoon = subVdashaJupiterMoon.data
                tempK.subVdashaSaturnMoon = subVdashaSaturnMoon.data
                tempK.subVdashaMercuryMoon = subVdashaMercuryMoon.data
                tempK.subVdashaKetuMoon = subVdashaKetuMoon.data
                tempK.subVdashaVenusMoon = subVdashaVenusMoon.data
                tempK.subVdashaSunMoon = subVdashaSunMoon.data
                tempK.subVdashaMoonMars = subVdashaMoonMars.data
                tempK.subVdashaMarsMars = subVdashaMarsMars.data
                tempK.subVdashaRahuMars = subVdashaRahuMars.data
                tempK.subVdashaJupiterMars = subVdashaJupiterMars.data
                tempK.subVdashaSaturnMars = subVdashaSaturnMars.data
                tempK.subVdashaMercuryMars = subVdashaMercuryMars.data
                tempK.subVdashaKetuMars = subVdashaKetuMars.data
                tempK.subVdashaVenusMars = subVdashaVenusMars.data
                tempK.subVdashaSunMars = subVdashaSunMars.data
                tempK.subVdashaMoonRahu = subVdashaMoonRahu.data
                tempK.subVdashaMarsRahu = subVdashaMarsRahu.data
                tempK.subVdashaRahuRahu = subVdashaRahuRahu.data
                tempK.subVdashaJupiterRahu = subVdashaJupiterRahu.data
                tempK.subVdashaSaturnRahu = subVdashaSaturnRahu.data
                tempK.subVdashaMercuryRahu = subVdashaMercuryRahu.data
                tempK.subVdashaKetuRahu = subVdashaKetuRahu.data
                tempK.subVdashaVenusRahu = subVdashaVenusRahu.data
                tempK.subVdashaSunRahu = subVdashaSunRahu.data
                tempK.subVdashaMoonJupiter = subVdashaMoonJupiter.data
                tempK.subVdashaMarsJupiter = subVdashaMarsJupiter.data
                tempK.subVdashaRahuJupiter = subVdashaRahuJupiter.data
                tempK.subVdashaJupiterJupiter = subVdashaJupiterJupiter.data
                tempK.subVdashaSaturnJupiter = subVdashaSaturnJupiter.data
                tempK.subVdashaMercuryJupiter = subVdashaMercuryJupiter.data
                tempK.subVdashaKetuJupiter = subVdashaKetuJupiter.data
                tempK.subVdashaVenusJupiter = subVdashaVenusJupiter.data
                tempK.subVdashaSunJupiter = subVdashaSunJupiter.data
                tempK.subVdashaMoonSaturn = subVdashaMoonSaturn.data
                tempK.subVdashaMarsSaturn = subVdashaMarsSaturn.data
                tempK.subVdashaRahuSaturn = subVdashaRahuSaturn.data
                tempK.subVdashaJupiterSaturn = subVdashaJupiterSaturn.data
                tempK.subVdashaSaturnSaturn = subVdashaSaturnSaturn.data
                tempK.subVdashaMercurySaturn = subVdashaMercurySaturn.data
                tempK.subVdashaKetuSaturn = subVdashaKetuSaturn.data
                tempK.subVdashaVenusSaturn = subVdashaVenusSaturn.data
                tempK.subVdashaSunSaturn = subVdashaSunSaturn.data
                tempK.subVdashaMoonMercury = subVdashaMoonMercury.data
                tempK.subVdashaMarsMercury = subVdashaMarsMercury.data
                tempK.subVdashaRahuMercury = subVdashaRahuMercury.data
                tempK.subVdashaJupiterMercury = subVdashaJupiterMercury.data
                tempK.subVdashaSaturnMercury = subVdashaSaturnMercury.data
                tempK.subVdashaMercuryMercury = subVdashaMercuryMercury.data
                tempK.subVdashaKetuMercury = subVdashaKetuMercury.data
                tempK.subVdashaVenusMercury = subVdashaVenusMercury.data
                tempK.subVdashaSunMercury = subVdashaSunMercury.data
                tempK.subVdashaMoonKetu = subVdashaMoonKetu.data
                tempK.subVdashaMarsKetu = subVdashaMarsKetu.data
                tempK.subVdashaRahuKetu = subVdashaRahuKetu.data
                tempK.subVdashaJupiterKetu = subVdashaJupiterKetu.data
                tempK.subVdashaSaturnKetu = subVdashaSaturnKetu.data
                tempK.subVdashaMercuryKetu = subVdashaMercuryKetu.data
                tempK.subVdashaKetuKetu = subVdashaKetuKetu.data
                tempK.subVdashaVenusKetu = subVdashaVenusKetu.data
                tempK.subVdashaSunKetu = subVdashaSunKetu.data
                tempK.subVdashaMoonVenus = subVdashaMoonVenus.data
                tempK.subVdashaMarsVenus = subVdashaMarsVenus.data
                tempK.subVdashaRahuVenus = subVdashaRahuVenus.data
                tempK.subVdashaJupiterVenus = subVdashaJupiterVenus.data
                tempK.subVdashaSaturnVenus = subVdashaSaturnVenus.data
                tempK.subVdashaMercuryVenus = subVdashaMercuryVenus.data
                tempK.subVdashaKetuVenus = subVdashaKetuVenus.data
                tempK.subVdashaVenusVenus = subVdashaVenusVenus.data
                tempK.subVdashaSunVenus = subVdashaSunVenus.data
                tempK.subVdashaMoonSun = subVdashaMoonSun.data
                tempK.subVdashaMarsSun = subVdashaMarsSun.data
                tempK.subVdashaRahuSun = subVdashaRahuSun.data
                tempK.subVdashaJupiterSun = subVdashaJupiterSun.data
                tempK.subVdashaSaturnSun = subVdashaSaturnSun.data
                tempK.subVdashaMercurySun = subVdashaMercurySun.data
                tempK.subVdashaKetuSun = subVdashaKetuSun.data
                tempK.subVdashaVenusSun = subVdashaVenusSun.data
                tempK.subVdashaSunSun = subVdashaSunSun.data

                console.log(tempK)
                setKundaliD(tempK)  
                setEnableLoader(false)  
        }))
    }
    
    useEffect(() => {
        fetchMultiData()
    }, [])
    
    return (
        <>
            {/* <KundaliPdf data={data}/> */}
            
            {enableLoader ? <Loading /> : null}

            {!enableLoader &&
                <>
                    <button style={{display: 'none'}} id="pageDownload" onClick={() => {
                        window.print() 
                    }}>Download</button>
                    <div className="page-start">
                        <div className="page-one">
                            <p className="name">{kundaliD.birthDetails.Name}</p>
                            <p className="dob">{kundaliD.birthDetails.Date} *{kundaliD.birthDetails.Time}* {kundaliD.birthDetails.Place}</p>
                            <img style={{width: '500px'}} src={Logo} onLoad={() => {document.getElementById("pageDownload").click()}} alt='logo' />
                            <h2 className="dob">{moment(new Date()).format('DD MMMM yyyy')}</h2>
                        </div>
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 1</div>  
                    </div>
                    <div className="page-start">
                        <div className="row pdfrow">
                            <div className="col-md-6">
                                <div className="subtitle">{t('Basic Details')}</div>
                                <table class="table pdftable table-bordered">
                                    {Object.entries(kundaliD.birthDetails).map(d => (
                                        <tr>
                                            <td>{t(d[0].length > 0 ? d[0].charAt(0).toUpperCase() + d[0].substr(1).toLowerCase() : d[0])}</td>
                                            <td>{d[1]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Panchang')}</div>
                                <table class="table pdftable table-bordered">
                                    {Object.entries(kundaliD.basicPanchang).map(d => (
                                        <tr>
                                            <td>{t(d[0].length > 0 ? d[0].charAt(0).toUpperCase() + d[0].substr(1).toLowerCase() : d[0])}</td>
                                            <td>{d[1]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6 mt-2">
                                <div className="subtitle">{t('Astro Details')}</div>
                                <table className="table pdftable table-bordered" style={{height: '60%'}}>
                                    {Object.entries(kundaliD.astroDetails).map(d => (
                                        <tr >
                                            <td>{t(d[0].length > 0 ? d[0].charAt(0).toUpperCase() + d[0].substr(1).toLowerCase() : d[0])}</td>
                                            <td>{d[1]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>    
                        {/* <div className="todaydate">{moment(new Date()).format('DD MMM yyyy')}</div> */}
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 2</div>
                    </div> 
                    <div className="page-start">
                        <div className="row pdfrow pdfrow">
                            <div className="col-md-6">
                                <div className="subtitle">{t('Naksahtra')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planet')}</th>
                                        <th>{t('Nakshatra')}</th>
                                        <th>{t('Naksh Lord')}</th>
                                        <th>{t('House')}</th>
                                        <th>{t('Degree')}</th>
                                    </thead>
                                    {kundaliD.planets.map(d => (
                                        <tr>
                                            <td>{d.name}</td>
                                            <td>{d.nakshatra}</td>
                                            <td>{d.nakshatraLord}</td>
                                            <td>{d.house}</td>
                                            <td>{d.fullDegree}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="col-md-12">
                                    <div className="subtitle">{t('Lagna Chart')}</div>
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.d1}} />
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.d1)}`} /> */}
                                </div>
                                <div className="col-md-12">
                                    <div className="subtitle">{t('Navmansha Chart')}</div>
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.d9}} />
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.d9)}`} /> */}
                                </div>
                            </div>
                        </div>
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 3</div>
                    </div>
                    <div className="page-start">
                        <div className="row pdfrow pdfrow">
                            <div className="col-md-12">
                                <div className="titlee">{t('Lagna')}</div>
                                <div className="singleTable">
                                        <div className="subtitle">{kundaliD.generalAscendantReport.asc_report.ascendant}</div>
                                        <div className="text">{kundaliD.generalAscendantReport.asc_report.report}</div>
                                </div> 
                                <div className="titlee">{t('Manglik Report')}</div>
                                <div className="singleTable">
                                        <div className="text">{kundaliD.matchManglikReport.male.manglik_report}</div>
                                </div>
                            </div>
                            <div className="col-md-12">
                            </div>
                        </div>
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 4</div>
                    </div>
                    <div className="page-start"> 
                        <div className="row pdfrow pdfrow">
                            <div className="col-md-12">
                                <div className="titlee">{t('Planets in Kundali')}</div>
                                {kundaliD.generalHouseReport.map((d, index) => (
                                    (index <= 2) && (<div className="singleTable">
                                            <div className="subtitle">{d.title}</div>
                                            <div className="text" dangerouslySetInnerHTML={{__html: d.content}}></div>
                                    </div>)
                                ))}
                            </div>
                        </div>
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 5</div>
                    </div>
                    {localStorage.getItem('selectedLanguage') && localStorage.getItem('selectedLanguage') === 'hi' && 
                        <div className="page-start"> 
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-12">
                                    <div className="titlee">{t('Planets in Kundali')}</div>
                                    {kundaliD.generalHouseReport.map((d, index) => (
                                        (index > 2 && index < 6) && (
                                        <div className="singleTable">
                                                <div className="subtitle">{d.title}</div>
                                                <div className="text" dangerouslySetInnerHTML={{__html: d.content}}></div>
                                        </div>)
                                    ))}
                                </div>
                            </div>
                            <a className="todaydate" href="https://astroking.com">astroking.com</a>
                            <div className="pageno">{t('Page')} 5</div>
                        </div>
                    }
                    {localStorage.getItem('selectedLanguage') && localStorage.getItem('selectedLanguage') === 'hi' && 
                        <div className="page-start"> 
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-12">
                                    <div className="titlee">{t('Planets in Kundali')}</div>
                                    {kundaliD.generalHouseReport.map((d, index) => (
                                        (index == 6) && (
                                        <div className="singleTable">
                                                <div className="subtitle">{d.title}</div>
                                                <div className="text" dangerouslySetInnerHTML={{__html: d.content}}></div>
                                        </div>)
                                    ))}
                                </div>
                            </div>
                            <a className="todaydate" href="https://astroking.com">astroking.com</a>
                            <div className="pageno">{t('Page')} 5</div>
                        </div>
                    }
                    <div className="page-start"> 
                        <div className="row pdfrow">
                            <div className="col-md-12">
                                <div className="titlee">{t('Yoga present in Kundali')}</div>
                                <div className="pdftable">
                                    {kundaliD.generalRashiReport.map((d, index) => (
                                        index < 4 &&
                                            <div className="singleTable">
                                                <div className="subtitle">{d.title}</div>
                                                <div className="text">{d.content}</div>
                                            </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 6</div>
                    </div>
                    <div className="page-start"> 
                        <div className="row pdfrow">
                            <div className="col-md-12">
                                <div className="titlee">{t('Yoga present in Kundali')}</div>
                                <div className="pdftable">
                                    <div className="singleTable">
                                                <div className="subtitle">{kundaliD.generalRashiReport[4].title}</div>
                                                <div className="text">{kundaliD.generalRashiReport[4].content}</div>
                                    </div>
                                    <div className="singleTable">
                                                <div className="subtitle">{kundaliD.generalRashiReport[5].title}</div>
                                                <div className="text">{kundaliD.generalRashiReport[5].content}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 7</div>
                    </div>
                    <div className="page-start">
                        <div className="row pdfrow">
                            <div className="row" style={{justifyContent: 'space-evenly'}}>
                                <div className="col-md-12">
                                    <div className="titlee">{t('Divisional Charts')}</div>                                        
                                </div>
                                <div className="col-md-6">
                                    <div className="subtitle">{t('Chalit Charts')}</div>
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.chalit)}`} /> */}
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.chalit}} />
                                    <div className="subtitle">{t('Moon Charts')}</div>
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.D_MOON)}`} />   */}
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.D_MOON}} />
                                    <div className="subtitle">{t('Drekkana Charts')}</div>
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.D3)}`} />  */}
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.D3}} />
                                </div>
                                <div className="col-md-6">
                                    <div className="subtitle">{t('Sun Charts')}</div>
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.D_SUN)}`} />  */}
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.D_SUN}} />  
                                    <div className="subtitle">{t('Hora Charts')}</div>
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.D2)}`} />  */}
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.D2}} /> 
                                    <div className="subtitle">{t('Chaturthamsa Charts')}</div>
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.D4)}`} />    */}
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.D4}} />         
                                </div>   
                            </div>
                        </div>
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 8</div>
                    </div>
                    <div className="page-start">
                        <div className="row pdfrow">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-4">
                                    <div className="subtitle">{t('Saptamsa Charts')}</div>
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.D7)}`} /> */}
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.D7}} />

                                    <div className="subtitle">{t('Dwadasamsa Charts')}</div>
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.D12)}`} /> */}
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.D12}} />

                                    <div className="subtitle">{t('Vimsamsa Charts')}</div>
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.D20)}`} /> */}
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.D20}} />

                                    <div className="subtitle">{t('Khavedamsa Charts')}</div>
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.D40)}`} /> */}
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.D40}} />
                                </div>
                                <div className="col-md-3"></div>
                                <div className="col-md-4">
                                    <div className="subtitle">{t('Dasamsa Charts')}</div>
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.D10)}`} />  */}
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.D10}} />    
                                    
                                    <div className="subtitle">{t('Shodasamsa Charts')}</div>
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.D16)}`} /> */}
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.D16}} />  

                                    <div className="subtitle">{t('Trimsamsa Charts')}</div>
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.D30)}`} /> */}
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.D30}} />    
                                    
                                    <div className="subtitle">{t('Akshavedamsa Charts')}</div>
                                    {/* <img src={`data:image/svg+xml;base64,${btoa(kundaliD.D45)}`} />  */}
                                    <span dangerouslySetInnerHTML={{__html: kundaliD.D45}} />          
                                </div>       
                            </div>
                        </div>
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 9</div>
                    </div>
                    <div className="page-start">
                        <div className="row pdfrow pdfrow">
                            <div className="col-md-6">
                                <div className="subtitle">{t('Maha Dasha')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.majorVdasha.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Antar Dasha')} - {t('Moon')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMoon.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Antar Dasha')} - {t('Mars')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMars.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Antar Dasha')} - {t('Rahu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaRahu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Antar Dasha')} - {t('Mercury')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMercury.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Antar Dasha')} - {t('Ketu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaKetu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            </div>   
                            <a className="todaydate" href="https://astroking.com">astroking.com</a>
                            <div className="pageno">{t('Page')} 10</div> 
                        </div>
                        <div className="page-start">
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-6">
                                <div className="subtitle">{t('Antar Dasha')} - {t('Jupiter')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaJupiter.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Antar Dasha')} - {t('Saturn')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSaturn.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Antar Dasha')} - {t('Venus')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaVenus.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Antar Dasha')} - {t('Sun')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSun.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>   
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 11</div> 
                    </div>
                    <div className="page-start">
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Moon')} - {t('Moon')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMoonMoon.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mars')} - {t('Moon')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMarsMoon.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Rahu')} - {t('Moon')} </div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaRahuMoon.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Jupiter')} - {t('Moon')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaJupiterMoon.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Saturn')} - {t('Moon')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSaturnMoon.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mercury')} - {t('Moon')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMercuryMoon.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>   
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 12</div> 
                    </div>
                    <div className="page-start">
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Ketu')} - {t('Moon')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaKetuMoon.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Venus')} - {t('Moon')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaVenusMoon.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Sun')} - {t('Moon')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSunMoon.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Moon')} - {t('Mars')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMoonMars.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mars')} - {t('Mars')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMarsMars.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle"> - {t('Rahu')} - {t('Mars')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaRahuMars.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>  
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 13</div>  
                    </div>
                    <div className="page-start">
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Jupiter')} - {t('Mars')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaJupiterMars.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Saturn')} - {t('Mars')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSaturnMars.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mercury')} - {t('Mars')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMercuryMars.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Ketu')} - {t('Mars')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaKetuMars.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Venus')} - {t('Mars')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaVenusMars.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Sun')} - {t('Mars')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSunMars.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>   
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 14</div> 
                    </div>
                    <div className="page-start">
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Moon')} - {t('Rahu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMoonRahu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mars')} - {t('Rahu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMarsRahu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Rahu')} - {t('Rahu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaRahuRahu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Jupiter')} - {t('Rahu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaJupiterRahu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Saturn')} - {t('Rahu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSaturnRahu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mercury')} - {t('Rahu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMercuryRahu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>    
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 15</div>
                    </div>
                    <div className="page-start">
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Ketu')} - {t('Rahu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaKetuRahu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Venus')} - {t('Rahu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaVenusRahu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Sun')} - {t('Rahu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSunRahu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Moon')} - {t('Jupiter')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMoonJupiter.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mars')} - {t('Jupiter')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMarsJupiter.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Rahu')} - {t('Jupiter')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaRahuJupiter.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>    
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 16</div>
                    </div>
                    <div className="page-start">
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Jupiter')} - {t('Jupiter')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaJupiterJupiter.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Saturn')} - {t('Jupiter')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSaturnJupiter.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mercury')} - {t('Jupiter')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMercuryJupiter.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Ketu')} - {t('Jupiter')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaKetuJupiter.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Venus')} - {t('Jupiter')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaVenusJupiter.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Sun')} - Jupite</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSunJupiter.map(d => (
                                        <tr>
                                            <td>{d.planet}r</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>    
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 17</div>
                    </div>
                    <div className="page-start">
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Moon')} - {t('Saturn')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMoonSaturn.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mars')} - {t('Saturn')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMarsSaturn.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Rahu')} - {t('Saturn')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaRahuSaturn.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Jupiter')} - {t('Saturn')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaJupiterSaturn.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Saturn')} - {t('Saturn')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSaturnSaturn.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mercury')} - {t('Saturn')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMercurySaturn.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>  
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 18</div>  
                    </div>
                    <div className="page-start">
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Ketu')} - {t('Saturn')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaKetuSaturn.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Venus')} - {t('Saturn')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaVenusSaturn.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Sun')} - {t('Saturn')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSunSaturn.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Moon')} - {t('Mercury')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMoonMercury.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mars')} - {t('Mercury')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMarsMercury.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Rahu')} - {t('Mercury')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaRahuMercury.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>    
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 19</div>
                    </div>
                    <div className="page-start">
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Jupiter')} - {t('Mercury')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaJupiterMercury.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Saturn')} - {t('Mercury')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSaturnMercury.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mercury')} - {t('Mercury')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMercuryMercury.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Ketu')} - {t('Mercury')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaKetuMercury.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Venus')} - {t('Mercury')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaVenusMercury.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Sun')} - {t('Mercury')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSunMercury.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>  
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 20</div>  
                    </div>
                    <div className="page-start">
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Moon')} - {t('Ketu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMoonKetu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mars')} - {t('Ketu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMarsKetu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Rahu')} - {t('Ketu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaRahuKetu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Jupiter')} - {t('Ketu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaJupiterKetu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Saturn')} - {t('Ketu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSaturnKetu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mercury')} - {t('Ketu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMercuryKetu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>    
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 21</div>
                    </div>
                    <div className="page-start">
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Ketu')} - {t('Ketu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaKetuKetu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Venus')} - {t('Ketu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaVenusKetu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Sun')} - {t('Ketu')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSunKetu.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Moon')} - {t('Venus')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMoonVenus.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mars')} - {t('Venus')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMarsVenus.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Rahu')} - {t('Venus')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaRahuVenus.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>    
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 22</div>
                    </div>
                    <div className="page-start">
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Jupiter')} - {t('Venus')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaJupiterVenus.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Saturn')} - {t('Venus')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSaturnVenus.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mercury')} - {t('Venus')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMercuryVenus.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Ketu')} - {t('Venus')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaKetuVenus.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Venus')} - {t('Venus')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaVenusVenus.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Sun')} - {t('Venus')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSunVenus.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>   
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 23</div> 
                    </div>
                    <div className="page-start">
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Moon')} - {t('Sun')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMoonSun.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mars')} - {t('Sun')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMarsSun.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Rahu')} - {t('Sun')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaRahuSun.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Jupiter')} - {t('Sun')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaJupiterSun.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Saturn')} - {t('Sun')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSaturnSun.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Mercury')} - {t('Sun')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaMercurySun.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 24</div>    
                    </div>
                    <div className="page-start">
                            <div className="row pdfrow pdfrow">
                                <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Ketu')} - {t('Sun')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaKetuSun.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Sun')} - {t('Sun')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaSunSun.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="subtitle">{t('Pratyantar Dasha')} - {t('Venus')} - {t('Sun')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.subVdashaVenusSun.map(d => (
                                        <tr>
                                            <td>{d.planet}</td>
                                            <td>{d.start.split(' ')[0]}</td>
                                            <td>{d.end.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 25</div>
                    </div>
                    <div className="page-start">
                        <div className="row pdfrow pdfrow">
                            <div className="col-md-12">
                                <div className="subtitle">{t('Char Dasha')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.majorChardasha.map(d => (
                                        <tr>
                                            <td>{d.sign_name}</td>
                                            <td>{d.start_date.split(' ')[0]}</td>
                                            <td>{d.end_date.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>    
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 26</div>
                    </div>
                    <div className="page-start">
                        <div className="row pdfrow pdfrow">
                            <div className="col-md-12">
                                <div className="subtitle">{t('Yogini Dasha')}</div>
                                <table className="table pdftable table-bordered">
                                    <thead>
                                        <th>{t('Planets')}</th>
                                        <th>{t('Start Date')}</th>
                                        <th>{t('End Date')}</th>
                                    </thead>
                                    {kundaliD.majorYoginiDasha.map(d => (
                                        <tr>
                                            <td>{d.dasha_name}</td>
                                            <td>{d.start_date.split(' ')[0]}</td>
                                            <td>{d.end_date.split(' ')[0]}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div> 
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 27</div>   
                    </div>
                    {kundaliD.planetAshtak.map((ashtak, index) => (
                        <div className="page-start">
                                <div className="row pdfrow">
                                <div className="col-md-12">
                                    <div className="subtitle">{t('Ashtakvarga')} - {ashtak.ashtak_varga.planet}</div>
                                    <table className="table pdftable table-bordered">
                                        <thead>
                                            <th>{t('Planets')}</th>
                                            <th>{t('Sun')}</th>
                                            <th>{t('Moon')}</th>
                                            <th>{t('Mars')}</th>
                                            <th>{t('Mercury')}</th>
                                            <th>{t('Jupiter')}</th>
                                            <th>{t('Venus')}</th>
                                            <th>{t('Saturn')}</th>
                                            <th>{t('Ascendant')}</th>
                                            <th>{t('Total')}</th>
                                        </thead>
                                        {Object.entries(ashtak.ashtak_points).map(d => (
                                            <tr>
                                                <td>{t(d[0])}</td>
                                                <td>{d[1]['sun']}</td>
                                                <td>{d[1]['moon']}</td>
                                                <td>{d[1]['mars']}</td>
                                                <td>{d[1]['mercury']}</td>
                                                <td>{d[1]['jupiter']}</td>
                                                <td>{d[1]['venus']}</td>
                                                <td>{d[1]['saturn']}</td>
                                                <td>{d[1]['ascendant']}</td>
                                                <td>{d[1]['total']}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>
                            
                            </div>
                            <a className="todaydate" href="https://astroking.com">astroking.com</a>
                            <div className="pageno">{t('Page')} {28 + index}</div>
                        </div>
                    ))}
                    
                    <div className="page-start">
                        <div className="row pdfrow p-5">
                            <p className="note">
                                <span className="dis_text"><b>{t('Disclaimer')}:</b> </span>
                                {t('Disclaimer_Content')}
                            </p>
                        </div>
                        <a className="todaydate" href="https://astroking.com">astroking.com</a>
                        <div className="pageno">{t('Page')} 36</div>
                    </div>
                </>
            }

            {/* <img src={`data:image/svg+xml;base64,${btoa(svg)}`} /> */}
        </>
    )
}

export default ReportRender