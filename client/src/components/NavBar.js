import React, { useState, useEffect } from "react";
import "./NavBar.css";

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;

            // Set isScrolled based on scroll position
            setIsScrolled(scrollTop > 0);
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`navbar navbar-expand-lg ${isScrolled ? "scrolled" : ""}`}
        >
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img
                        src={require("./Kelaniya.png")}
                        alt="Logo"
                        className="logo"
                    />
                    DHARAMALOKA HALL
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="./home">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./about">
                                About
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./login">
                                Login
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./register">
                                Register
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;



/*
import React from "react"
import './Navbar.css';

function Navbar() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">DHARAMALOKA HALL</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Register</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;
*/