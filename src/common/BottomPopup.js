import React from 'react';


export default function BottomPopup(props){
    const [BottomPopupIStrue, setBottomPopupIStrue] = React.useState(localStorage['AppPopup']);
    
    

    return <>
        
    {
        BottomPopupIStrue ? <div className="container-fluid">
        <div className="row">
            <div className="Appbg">
                <div className="container">
                    <div className="row">
                        <div className='col-md-6 col-12'>
                            <h4> You want to open website on application.</h4>
                        </div>
                        <div className='col-md-6 col-sm-12 col-12 text-right'>
                            <button type="button" onClick={()=>{
                               setBottomPopupIStrue(localStorage.setItem('AppPopup', false)) 
                               
                            }} className="close colseBtn">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <a href="https://play.google.com/store/apps/details?id=com.astroking" target="_blank" className="opnBtn">
                            <button className="btn openBtn"> Open App <i class="bi bi-cursor openApp"></i></button> 
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> :null
    }
        
    </>
}