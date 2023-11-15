import React from "react";
import User from "../images/user.svg";
const HeaderUser = () => {
    return (
        <div className="row header">
            <div className="col-12 col-md-3 col-sm-12 text-left">
                <span className="astrology">Astrology</span>
            </div>
            <div className="col-12 col-md-4 col-sm-12">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col-3 text-left">
                                <div className="header-icon mr-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-telephone-fill icon-color" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="col-9">
                                <p className="contect-name">Contact Us</p>
                                <p className="contect-number">+1 123-456-7890</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-3">
                                <div className="header-icon mr-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-envelope-fill icon-color" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="col-9 text-left">
                                <p className="contect-name">Email Us</p>
                                <p className="contect-number">+1 123-456-7890</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="d-flex">
                    <div className="d-flex">
                        <div className="header-icon mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-telephone-fill icon-color" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                            </svg>
                        </div>
                        <span>Contact Us</span><br />
                        <span>+1 123-456-7890</span>
                    </div>
                    <div className="d-flex">
                        <div className="header-icon mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-envelope-fill icon-color" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                            </svg>
                        </div>
                        <span>Email US</span><br />
                        <span>+1 123-456-7890</span>
                    </div>
                </div> */}

            </div>
            <div className="col-12 col-md-5 col-sm-12 user-dropdown text-right">
                <div className="row">
                    <div className="col text-right">
                        <button type="button" class="btn notification">
                            <i class="bi bi-bell-fill"></i><span class="badge">4</span>
                        </button>
                    </div>
                    <div className="col-3 p-0 text-right">
                        <div class="dropdowˀn show">
                            <a class="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Abhinav S
                             </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                <a class="dropdown-item" href="#">Dashboard</a>
                                <a class="dropdown-item" href="#">Account Settings</a>
                                <a class="dropdown-item logout" href="#">Logout</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 p-0 text-right">
                        <img className="user" src={User} alt="user"></img>
                    </div>
                </div>



            </div>
        </div>
    )
}
export default HeaderUser;