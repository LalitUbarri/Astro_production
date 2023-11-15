import React from 'react'
import Footer from '../common/Footer';
import Header from '../common/prodlandingHeader';
import Support from './Support';

export default function support_page() {
    return (
        <>
            <div className="header_suport">
                <Header url={''} />
            </div>

            <div>
                <Support />
            </div>


        </>
    )
}
