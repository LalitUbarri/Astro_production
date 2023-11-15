import React from 'react'
import '../styles/PageNotFound.css';
import notFound from '../images/newImages/2696450.jpg'
import * as constent from '../configuration/constants';

export default function PageNotFound() {
    return (
        <div className="pagenotfound_container_fluid">
            <div className="pagenotfound_contanier mt-5">
                <div className="pagenotfound_image">
                    <img src={notFound} alt="404" width="50%" />
                </div>
                <div className="mt-3">
                    <h1> 404 </h1>
                    <h2> Ooops! You weren't Supposed to see this </h2>
                    <p> the page you're looking for no longer Exists.</p>
                    <p>Return to the <a href={constent.FRONTEND_NAME + '/home'}>Home page </a>and remember: you haven't see anything. </p>
                </div>
            </div>

        </div>
    )
}
