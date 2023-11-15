import React, { useState, useEffect } from 'react' 
import ReactPDF, { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import KundaliPdf from './kundaliPdf'
import moment from 'moment'
//API
import { getCommonHeaders } from "../configuration/commonFunctions"
import apis from "../configuration/apis"
import {KundaliBodyPDF} from "../configuration/kundaliBody"
import axios from 'axios'

import Loading from './loader'
import { saveAs } from 'file-saver'


const encodeSvgString = (svg ) => {
    const decoded = unescape(encodeURIComponent(svg));
    const b64String = btoa(decoded);
    const imgSource = `data:image/svg+xml;base64,${b64String}`;
    return imgSource;
  }
  
  const svgToDataURI = (svgData, renderWidth, renderHeight) => {
    const id = '1111';
    const canvas = document.createElement('canvas')
    canvas.setAttribute('id', id)
    // canvas.setAttribute('style', 'display: none');
    canvas.setAttribute('style', 'background-color: white');
    document.body.appendChild(canvas);
  
    canvas.width = renderWidth;
    canvas.height = renderHeight;
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      throw new Error('no canvas 2d context')
    }
  
    const img = document.createElement('img');
    img.setAttribute('src', encodeSvgString(svgData));
    
    return new Promise((res) => {
      img.onload = function load() {
        ctx.drawImage(img, 0, 0);
        const url = canvas.toDataURL('image/jpeg', 1.0);
        const el = document.getElementById(id);
        if (el) el.remove();
  
        res(url)
      };
  
    })
  }


const ReportRender = (props) => {

    const [enableLoader, setEnableLoader] = useState(true)

    //const propsData = JSON.parse(localStorage.getItem('kundaliData'))[0]
    const propsData = props.location.state.kundaliData

    // const menu = ["birthDetails", "basicPanchang", "astroDetails", '']
        
    const [kundaliD, setKundaliD] = useState({})

    const [kundali, setKundali] = useState('')

    // const [selectedMenu, setSelectedMenu] = useState('birthDetails')

    const [fetchedCount, setFetchedCount] = useState(0)

    let counter = 0

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="612" height="502.174" viewBox="0 65.326 612 502.174" class="logo"><ellipse class="ground" cx="283.5" cy="487.5" rx="259" ry="80"/><path class="kiwi" d="M210.333 65.331c-105.966.774-222.682 85.306-209.277 211.118 4.303 40.393 18.533 63.704 52.171 79.03 36.307 16.544 57.022 54.556 50.406 112.954-9.935 4.88-17.405 11.031-19.132 20.015 7.531-.17 14.943-.312 22.59 4.341 20.333 12.375 31.296 27.363 42.979 51.72 1.714 3.572 8.192 2.849 8.312-3.078.17-8.467-1.856-17.454-5.226-26.933-2.955-8.313 3.059-7.985 6.917-6.106 6.399 3.115 16.334 9.43 30.39 13.098 5.392 1.407 5.995-3.877 5.224-6.991-1.864-7.522-11.009-10.862-24.519-19.229-4.82-2.984-.927-9.736 5.168-8.351l20.234 2.415c3.359.763 4.555-6.114.882-7.875-14.198-6.804-28.897-10.098-53.864-7.799-11.617-29.265-29.811-61.617-15.674-81.681 12.639-17.938 31.216-20.74 39.147 43.489-5.002 3.107-11.215 5.031-11.332 13.024 7.201-2.845 11.207-1.399 14.791 0 17.912 6.998 35.462 21.826 52.982 37.309 3.739 3.303 8.413-1.718 6.991-6.034-2.138-6.494-8.053-10.659-14.791-20.016-3.239-4.495 5.03-7.045 10.886-6.876 13.849.396 22.886 8.268 35.177 11.218 4.483 1.076 9.741-1.964 6.917-6.917-3.472-6.085-13.015-9.124-19.18-13.413-4.357-3.029-3.025-7.132 2.697-6.602 3.905.361 8.478 2.271 13.908 1.767 9.946-.925 7.717-7.169-.883-9.566-19.036-5.304-39.891-6.311-61.665-5.225-43.837-8.358-31.554-84.887 0-90.363 29.571-5.132 62.966-13.339 99.928-32.156 32.668-5.429 64.835-12.446 92.939-33.85 48.106-14.469 111.903 16.113 204.241 149.695 3.926 5.681 15.819 9.94 9.524-6.351-15.893-41.125-68.176-93.328-92.13-132.085-24.581-39.774-14.34-61.243-39.957-91.247-21.326-24.978-47.502-25.803-77.339-17.365-23.461 6.634-39.234-7.117-52.98-31.273-29.365-51.617-81.947-74.215-137.452-73.811zM445.731 203.01c6.12 0 11.112 4.919 11.112 11.038 0 6.119-4.994 11.111-11.112 11.111s-11.038-4.994-11.038-11.111a11.01 11.01 0 0111.038-11.038z"/></svg>`;

    //alert('data:image/svg+xml;base64,' + btoa(svg))
    const img = 'data:image/svg+xml;base64,' + btoa(svg)

    const fetchKundaliData = () => {
        
        setEnableLoader(true)

        const headers = getCommonHeaders()

        let url = "birthDetails"
        
        const menu = ["birthDetails", "basicPanchang", "astroDetails", "planets"]

        let counter = 0

        menu.forEach(selectedMenu => {

            const body = KundaliBodyPDF(propsData, selectedMenu, [], 1)

            apis
                .getKundaliDetails(body, headers)
                .then((response) => response.data)
                .then((data) => {
                    if (!data.code) {
                        // console.log(data)
                        // counter++;
                        let pushData = {}
                        let tempK = kundaliD
                        if(selectedMenu === 'basicPanchang') {
                            delete data.day
                            delete data.vedic_sunrise
                            delete data.vedic_sunset
                            tempK.basicPanchang = data
                            setKundaliD(tempK)
                            setFetchedCount(fetchedCount + 1)
                        }
                        else if(selectedMenu === 'astroDetails') {
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
                            tempK.astroDetails = data
                            setKundaliD(tempK)
                            setFetchedCount(fetchedCount + 1)
                        }
                        else {
                            // data["Naksahtra-Charan"] = data.Naksahtra
                            pushData.Name = propsData.name
                            pushData.Date = moment(propsData.birthDate).format('DD MMM yyyy')
                            pushData.Time = moment(propsData.birthTime).format('HH:MM A')
                            pushData.latitude = data.latitude
                            pushData.longitude = data.longitude
                            pushData.timezone = data.timezone
                            pushData.sunrise = data.sunrise
                            pushData.sunset = data.sunset
                            pushData.ayanamsha = data.ayanamsha
                            tempK.birthDetails = pushData
                            setKundaliD(tempK)    
                            setFetchedCount(fetchedCount + 1)                        
                        }
                        
                        counter++
                        alert(fetchedCount + 1)
                        //setFetchedCount(fetchedCount + 1)
                        // setKundaliD(data)
                        // setEnableLoader(false)
                    }
                })
                .catch((error) => {
                    alert('Error')
                    console.log(error)
                    setEnableLoader(false)
                })
            })
    }    

    const fetchMultiData = () => {

        let requestObj = []
        // const headers = getCommonHeaders()
        const headers = {
            'Authorization': 'Basic NjE4ODkyOmM2NThiYzc4YzI2YzRkOWZjMzQ2MTRjNGNmNTg0MDA2'
        }
        const menu = ["birth_details", "basic_panchang", "astro_details", "planets", "major_chardasha", "major_yogini_dasha", "match_manglik_report", 'general_ascendant_report',
        'general_house_report', 'general_rashi_report', 'major_vdasha', 'sub_vdasha', 'sub_sub_vdasha', 'sub_sub_sub_vdasha', 'horo_chart_image']
        
        // let urll = "generalHouseReport"
        //    url = 'generalRashiReport'

        // let url = 'http://14.99.239.245:8080/FlexPlatform/getResponse'

        let url = 'https://json.astrologyapi.com/v1/'
        let dataFetch = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn']
        let dataFetch2 = ['moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn']

        menu.forEach(m => {

            let body = KundaliBodyPDF(propsData, m, [], 1)
            if (m === 'match_manglik_report') {
                body = KundaliBodyPDF(propsData, m, [], 2)
                requestObj.push(axios.post(url + m + '/', body, { headers }))
            }
            else if (m === 'sub_vdasha') {
                body = KundaliBodyPDF(propsData, m, ['moon'], 1)
                requestObj.push(axios.post(url + m + '/moon', body, { headers }))

            } 
            else if (m === 'sub_sub_vdasha') {
                body = KundaliBodyPDF(propsData, m, ['moon', 'moon'], 1)
                requestObj.push(axios.post(url + m + '/moon/moon', body, { headers }))
                
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

        axios.all(requestObj).then(
            axios.spread((respOne, respTwo, resthree, planets, majorChardasha, majorYoginiDasha, matchManglikReport, generalAscendantReport, sun, moon, mars, mercury, jupiter, venus, saturn, moon2, mars2, mercury2, jupiter2, venus2, saturn2, majorVdasha, subVdasha, subSubVdasha, subSubSubVdasha, d1, d9,
                chalit, D_SUN, D_MOON, D2,D3, D4, D7,D10,D12, D16, D20,D30,D40,D45,D60) => {

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
                pushData.Time = moment(propsData.birthTime).format('HH:MM A')
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

                tempK.subVdasha = subVdasha.data
                
                tempK.subSubVdasha = subSubVdasha.data

                tempK.subSubSubVdasha = subSubSubVdasha.data

                let blob = new Blob([d1], {type: 'image/svg+xml'})
                saveAs(blob, 'Lagna.svg')
                
                blob = new Blob([d9], {type: 'image/svg+xml'})
                saveAs(blob, 'Navmansha.svg')

                blob = new Blob([chalit], {type: 'image/svg+xml'})
                saveAs(blob, 'chalit.svg')

                
                blob = new Blob([D_SUN], {type: 'image/svg+xml'})
                saveAs(blob, 'D_SUN.svg')

                
                blob = new Blob([D_MOON], {type: 'image/svg+xml'})
                saveAs(blob, 'D_MOON.svg')

                
                blob = new Blob([D2], {type: 'image/svg+xml'})
                saveAs(blob, 'D2.svg')

                
                blob = new Blob([D3], {type: 'image/svg+xml'})
                saveAs(blob, 'D3.svg')

                
                blob = new Blob([D4], {type: 'image/svg+xml'})
                saveAs(blob, 'D4.svg')

                
                blob = new Blob([D7], {type: 'image/svg+xml'})
                saveAs(blob, 'D7.svg')
                
                blob = new Blob([D10], {type: 'image/svg+xml'})
                saveAs(blob, 'D10.svg')
                
                blob = new Blob([D12], {type: 'image/svg+xml'})
                saveAs(blob, 'D12.svg')
                
                blob = new Blob([D16], {type: 'image/svg+xml'})
                saveAs(blob, 'D16.svg')
                
                blob = new Blob([D20], {type: 'image/svg+xml'})
                saveAs(blob, 'D20.svg')
                
                blob = new Blob([D30], {type: 'image/svg+xml'})
                saveAs(blob, 'D30.svg')
                
                blob = new Blob([D40], {type: 'image/svg+xml'})
                saveAs(blob, 'D40.svg')
                
                blob = new Blob([D45], {type: 'image/svg+xml'})
                saveAs(blob, 'D45.svg')
                
                blob = new Blob([D60], {type: 'image/svg+xml'})
                saveAs(blob, 'D60.svg')

                console.log(tempK)
                setKundaliD(tempK)  
                setEnableLoader(false)  
        }))
    }
    
    const data = {
        name: 'Ashutosh Singh',
        dob: '12 Feb 2023',
        place: 'Varanasi, India'
    }
    
    useEffect(() => {
        fetchMultiData()
    }, [])
    
    return (
        <>
            {/* <KundaliPdf data={data}/> */}
            
            {enableLoader ? <Loading /> : null}

            {!enableLoader && 
                <PDFViewer>
                    <KundaliPdf kundali={kundaliD} data={data}/>
                </PDFViewer>
                // <>
                //     <img src={kundaliD} />
                //     <img src={`data:image/svg+xml;base64,${btoa(kundali)}`} />
                // </>
            }

            {/* <img src={`data:image/svg+xml;base64,${btoa(svg)}`} /> */}
        </>
    )
}

export default ReportRender