import React from "react";
import "./About.css"; // Import CSS file for styling
import Cards1 from '../components/Cards1';

function About() {
    return (
        <div className="about-container">
            <div className="about-section">
                <p>The Dharmaloka Hall is a prominent landmark at the University of Kelaniya. It serves as a venue for various academic, cultural, and social events within the university community.</p>
                <p>Named after the venerable Dharmaloka Thera, a key figure in Sri Lankan Buddhist history, the hall stands as a symbol of the university's commitment to education and cultural enrichment.</p>
                <p>With its spacious auditorium and modern facilities, the Dharmaloka Hall continues to be a hub of activity, hosting lectures, seminars, performances, and other important gatherings.</p>
            </div>

                <Cards1 />

        </div>
    );
}

export default About;
