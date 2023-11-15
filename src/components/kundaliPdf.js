import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import Logo from '../images/newImages/WhatsApp-Image-2021-08-02-a.png'

import moment from 'moment'

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    text: {
        fontSize: '14px', 
        fontWeight: '600',
        
    },
    note: {
        fontSize: '14px', 
        fontWeight: 'normal'
    },
    name: {
        fontSize: '32px',
        color: '#802b00',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: '100px'
    },
    title: {
        fontSize: '32px',
        color: '#802b00',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: '10px'
    },
    subtitle: {
        fontSize: '24px',
        color: '#802b00',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: '5px'
    },
    dob: {
        marginTop: '10px',
        fontSize: '18px',
        color: '#802b00',
        fontWeight: '500',
        textAlign: 'center'
    },row: {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid black',
        width: '100%'
        // paddingTop: 8,
        // paddingBottom: 8,
      },
      row1: {
        width: '50%',
        border: '1px solid black',
        padding: '5px'
      },
      row2: {
        width: '50%',
        border: '1px solid black',
        padding: '5px'
      },
      rowNaksharta: {
        fontSize: '14px',
        width: '20%',
        border: '1px solid black',
        padding: '3px'
      },
      rowNaksharta2: {
        fontSize: '14px',
        width: '15%',
        border: '1px solid black',
        padding: '3px'
      },
      rowNaksharta3: {
        fontSize: '14px',
        width: '15%',
        border: '1px solid black',
        padding: '3px'
      },
      rowNakshart4: {
        fontSize: '14px',
        width: '30%',
        border: '1px solid black',
        padding: '3px'
      },
      rowNaksharta5: {
        fontSize: '14px',
        width: '10%',
        border: '1px solid black',
        padding: '3px'
      },
      row3Col : {
        fontSize: '14px',
        width: '33.33%',
        border: '1px solid black',
        padding: '3px'
      },
      table: {
          fontSize: '14px',
          marginTop: '20px',
          marginBottom: '20px',
          border: '1px solid black',
        //   width: '55%'
      },
      singleTable: {
        fontSize: '18px',
        marginTop: '20px',
        marginBottom: '20px',
        border: '1px solid black',
        padding: '20px'
      },
      pageno: {
        position: 'absolute',
        bottom: '2%',
        right: '2%'
      },
      todaydate: {
        position: 'absolute',
        bottom: '2%',
        left: '2%'
      }
  });

// const SvgRender = (svgdata) => (
//     <span dangerouslySetInnerHTML={{__html: svgdata}} />    
// )

const KundaliPdf = (props) => {

    return (
        <Document>
            {/* <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text></Text>
                </View>
                <View style={styles.section}>
                    <Text></Text>
                </View>
            </Page> */}
            
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.name}>{props.kundali.birthDetails.Name}</Text>
                    <Text style={styles.dob}>{props.kundali.birthDetails.Date} {props.data.place}</Text>
                    <Image src={Logo}></Image>
                    <Text style={styles.todaydate}>{moment(new Date()).format('DD MMM yyyy')}</Text>
                    <Text style={styles.pageno}>Page 1</Text>
                </View>    
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Basic Details</Text>
                    <View style={styles.table}>
                        {Object.entries(props.kundali.birthDetails).map(d => (
                            <View style={styles.row} >
                                <Text style={styles.row1}>{d[0].length > 0 ? d[0].charAt(0).toUpperCase() + d[0].substr(1).toLowerCase() : d[0]}</Text>
                                <Text  style={styles.row2}>{d[1]}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.subtitle}>Basic Panchang</Text>
                    <View style={styles.table}>
                        {Object.entries(props.kundali.basicPanchang).map(d => (
                            <View style={styles.row} >
                                <Text style={styles.row1}>{d[0].length > 0 ? d[0].charAt(0).toUpperCase() + d[0].substr(1).toLowerCase() : d[0]}</Text>
                                <Text  style={styles.row2}>{d[1]}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.todaydate}>{moment(new Date()).format('DD MMM yyyy')}</Text>
                    <Text style={styles.pageno}>Page 2</Text>  
                </View>  
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Basic Details</Text>
                    <Text style={styles.subtitle}>Astro Details</Text>
                    <View style={styles.table}>
                        {Object.entries(props.kundali.astroDetails).map(d => (
                            <View style={styles.row} >
                                <Text style={styles.row1}>{d[0].length > 0 ? d[0].charAt(0).toUpperCase() + d[0].substr(1).toLowerCase() : d[0]}</Text>
                                <Text  style={styles.row2}>{d[1]}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.todaydate}>{moment(new Date()).format('DD MMM yyyy')}</Text>
                    <Text style={styles.pageno}>Page 3</Text>
                </View>    
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Naksharta</Text>
                    <View style={styles.table}>
                        <View style={styles.row} >
                            <Text style={styles.rowNaksharta}>Planet</Text>
                            <Text style={styles.rowNaksharta}>Nakshatra</Text>
                            <Text style={styles.rowNaksharta}>Naksh Lord</Text>
                            <Text style={styles.rowNaksharta5}>House</Text>
                            <Text style={styles.rowNaksharta4}>Degree</Text>
                        </View>
                        {props.kundali.planets.map(d => (
                            <View style={styles.row} >
                                <Text style={styles.rowNaksharta}>{d.name}</Text>
                                <Text style={styles.rowNaksharta}>{d.nakshatra}</Text>
                                <Text style={styles.rowNaksharta}>{d.nakshatraLord}</Text>
                                <Text style={styles.rowNaksharta5}>{d.house}</Text>
                                <Text style={styles.rowNaksharta4}>{d.fullDegree}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.todaydate}>{moment(new Date()).format('DD MMM yyyy')}</Text>
                    <Text style={styles.pageno}>Page 4</Text>  
                </View>    
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Maha Dasha</Text>
                    <View style={styles.table}>
                        <View style={styles.row} >
                            <Text style={styles.row3Col}>Planets</Text>
                            <Text style={styles.row3Col}>Start Date</Text>
                            <Text style={styles.row3Col}>End Date</Text>
                        </View>
                        {props.kundali.majorVdasha.map(d => (
                            <View style={styles.row} >
                                <Text style={styles.row3Col}>{d.planet}</Text>
                                <Text style={styles.row3Col}>{d.start}</Text>
                                <Text style={styles.row3Col}>{d.end}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.title}>Antar Dasha</Text>
                    <View style={styles.table}>
                        <View style={styles.row} >
                            <Text style={styles.row3Col}>Planets</Text>
                            <Text style={styles.row3Col}>Start Date</Text>
                            <Text style={styles.row3Col}>End Date</Text>
                        </View>
                        {props.kundali.subVdasha.map(d => (
                            <View style={styles.row} >
                                <Text style={styles.row3Col}>{d.planet}</Text>
                                <Text style={styles.row3Col}>{d.start}</Text>
                                <Text style={styles.row3Col}>{d.end}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.title}>Pratyantar Dasha</Text>
                    <View style={styles.table}>
                        <View style={styles.row} >
                            <Text style={styles.row3Col}>Planets</Text>
                            <Text style={styles.row3Col}>Start Date</Text>
                            <Text style={styles.row3Col}>End Date</Text>
                        </View>
                        {props.kundali.subSubVdasha.map(d => (
                            <View style={styles.row} >
                                <Text style={styles.row3Col}>{d.planet}</Text>
                                <Text style={styles.row3Col}>{d.start}</Text>
                                <Text style={styles.row3Col}>{d.end}</Text>
                            </View>
                        ))}
                    </View>
                    
                    <Text style={styles.title}>Sookshma Dasha</Text>
                    <View style={styles.table}>
                        <View style={styles.row} >
                            <Text style={styles.row3Col}>Planets</Text>
                            <Text style={styles.row3Col}>Start Date</Text>
                            <Text style={styles.row3Col}>End Date</Text>
                        </View>
                        {props.kundali.subSubSubVdasha.map(d => (
                            <View style={styles.row} >
                                <Text style={styles.row3Col}>{d.planet}</Text>
                                <Text style={styles.row3Col}>{d.start}</Text>
                                <Text style={styles.row3Col}>{d.end}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.todaydate}>{moment(new Date()).format('DD MMM yyyy')}</Text>
                    <Text style={styles.pageno}>Page 5</Text>  
                </View>    
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Char Dasha</Text>
                    <View style={styles.table}>
                        <View style={styles.row} >
                            <Text style={styles.row3Col}>Planets</Text>
                            <Text style={styles.row3Col}>Start Date</Text>
                            <Text style={styles.row3Col}>End Date</Text>
                        </View>
                        {props.kundali.majorChardasha.map(d => (
                            <View style={styles.row} >
                                <Text style={styles.row3Col}>{d.sign_name}</Text>
                                <Text style={styles.row3Col}>{d.start_date}</Text>
                                <Text style={styles.row3Col}>{d.end_date}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.todaydate}>{moment(new Date()).format('DD MMM yyyy')}</Text>
                    <Text style={styles.pageno}>Page 6</Text>  
                </View>    
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Yogini Dasha</Text>
                    <View style={styles.table}>
                        <View style={styles.row} >
                            <Text style={styles.row3Col}>Planets</Text>
                            <Text style={styles.row3Col}>Start Date</Text>
                            <Text style={styles.row3Col}>End Date</Text>
                        </View>
                        {props.kundali.majorYoginiDasha.map(d => (
                            <View style={styles.row} >
                                <Text style={styles.row3Col}>{d.dasha_name}</Text>
                                <Text style={styles.row3Col}>{d.start_date}</Text>
                                <Text style={styles.row3Col}>{d.end_date}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.todaydate}>{moment(new Date()).format('DD MMM yyyy')}</Text>
                    <Text style={styles.pageno}>Page 7</Text>  
                </View>    
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Lagna</Text>
                    <View style={styles.singleTable}>
                            <Text style={styles.subtitle}>{props.kundali.generalAscendantReport.asc_report.ascendant}</Text>
                            <Text style={styles.text}>{props.kundali.generalAscendantReport.asc_report.report}</Text>
                    </View>
                    <Text style={styles.todaydate}>{moment(new Date()).format('DD MMM yyyy')}</Text>
                    <Text style={styles.pageno}>Page 8</Text>  
                </View>    
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Free Report Manglik</Text>
                    <View style={styles.singleTable}>
                            <Text style={styles.text}>{props.kundali.matchManglikReport.male.manglik_report}</Text>
                    </View>
                    <Text style={styles.todaydate}>{moment(new Date()).format('DD MMM yyyy')}</Text>
                    <Text style={styles.pageno}>Page 9</Text>  
                </View>    
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Planets in Kundali</Text>
                    {props.kundali.generalHouseReport.map(d => (
                        <View style={styles.singleTable}>
                                <Text style={styles.subtitle}>{d.title}</Text>
                                <Text style={styles.text}>{d.content}</Text>
                        </View>
                    ))}
                    <Text style={styles.todaydate}>{moment(new Date()).format('DD MMM yyyy')}</Text>
                    <Text style={styles.pageno}>Page 10</Text>  
                </View>    
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Yoga present in Kundali</Text>
                    <View style={styles.table}>
                        {props.kundali.generalRashiReport.map(d => (
                            <View style={styles.singleTable}>
                                    <Text style={styles.subtitle}>{d.title}</Text>
                                    <Text style={styles.text}>{d.content}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.todaydate}>{moment(new Date()).format('DD MMM yyyy')}</Text>
                    <Text style={styles.pageno}>Page 11</Text>  
                </View>    
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Ashtakvarga</Text>
                    <View style={styles.table}>
                        <View style={styles.row} >
                            <Text style={styles.row3Col}>Planets</Text>
                            <Text style={styles.row3Col}>Start Date</Text>
                            <Text style={styles.row3Col}>End Date</Text>
                        </View>
                        {props.kundali.majorYoginiDasha.map(d => (
                            <View style={styles.row} >
                                <Text style={styles.row3Col}>{d.dasha_name}</Text>
                                <Text style={styles.row3Col}>{d.start_date}</Text>
                                <Text style={styles.row3Col}>{d.end_date}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.todaydate}>{moment(new Date()).format('DD MMM yyyy')}</Text>
                    <Text style={styles.pageno}>Page 12</Text>  
                </View>    
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Free Report Divisinal Charts</Text>
                    
                    <Text style={styles.todaydate}>{moment(new Date()).format('DD MMM yyyy')}</Text>
                    <Text style={styles.pageno}>Page 12</Text>  
                </View>    
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                        
                        <Text  style={styles.note}>
                        <Text style={styles.dis_text}>Disclaimer: </Text> We wants to make it clear that we put our best efforts in providing this report but any prediction

                        that you receive from us is not to be considered as a substitute for advice, program, or treatment

                        that you would normally receive from a licensed professional such as a lawyer, doctor,

                        psychiatrist, or financial adviser. Although we try our best to give you accurate calculations, we

                        do not rule out the possibility of errors. The report are provided as-is and we provides no

                        guarantees, implied warranties, or assurances of any kind, and will not be responsible for any

                        interpretation made or use by the recipient of the information and data mentioned above. If you

                        are not comfortable with this information, please do not use it.</Text>
                    <Text style={styles.todaydate}>{moment(new Date()).format('DD MMM yyyy')}</Text>
                    <Text style={styles.pageno}>Page 12</Text>
                </View>
            </Page>
        </Document>
    )
}

export default KundaliPdf