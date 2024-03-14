import React from "react";
import "./Footer.css";

function footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h2>Contact Us</h2>
                    <p>
                        Faculty of Science,<br />
                        University of Kelaniya,<br />
                        Dalugama, Kelaniya,<br />
                        Sri Lanka, 11600.
                    </p>
                </div>
                <div className="footer-section">
                    <h2>Contact Details</h2>
                    <p>
                        Tel: +94 (0) 112 903 201<br />
                        Fax: +94 (0) 112 903 203<br />
                        Email: deansc@kln.ac.lk
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default footer;
