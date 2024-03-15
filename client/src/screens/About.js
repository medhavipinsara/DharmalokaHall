import React, { useState } from "react";
import "./About.css"; // Import CSS file for styling

// Import images
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import image5 from "../images/image5.jpg";

function About() {
    const [currentAlbum, setCurrentAlbum] = useState(0); // State to track current album

    // Sample album data (You can replace it with your actual data)
    const albums = [
        {
            title: "Event Album 1",
            description: "Description of Event Album 1",
            images: [image1, image2]
        },
        {
            title: "Event Album 2",
            description: "Description of Event Album 2",
            images: [image3, image4]
        },
        {
            title: "Event Album 3",
            description: "Description of Event Album 3",
            images: [image5, image2]
        }
    ];

    // Function to handle next album
    const nextAlbum = () => {
        setCurrentAlbum((prevAlbum) => (prevAlbum === albums.length - 1 ? 0 : prevAlbum + 1));
    };

    // Function to handle previous album
    const prevAlbum = () => {
        setCurrentAlbum((prevAlbum) => (prevAlbum === 0 ? albums.length - 1 : prevAlbum - 1));
    };

    return (
        <div className="about-container">
            <h1>About Dharamaloka Hall</h1>
            <p>The Dharamaloka Hall is a prominent landmark at the University of Kelaniya.</p>
            <p>It serves as a venue for various academic, cultural, and social events within the university community.</p>
            <p>Named after the venerable Dharamaloka Thera, a key figure in Sri Lankan Buddhist history, the hall stands as a symbol of the university's commitment to education and cultural enrichment.</p>
            <p>With its spacious auditorium and modern facilities, the Dharamaloka Hall continues to be a hub of activity, hosting lectures, seminars, performances, and other important gatherings.</p>

            {/* Slideshow */}
            <div className="slideshow-container">
                <button className="prev" onClick={prevAlbum}>&#10094;</button>
                <div className="album">
                    {albums[currentAlbum].images.map((image, index) => (
                        <img key={index} src={image} alt={`Album ${currentAlbum + 1}`} />
                    ))}
                </div>
                <button className="next" onClick={nextAlbum}>&#10095;</button>
                <div className="album-title">{albums[currentAlbum].title}</div>
            </div>

            {/* Album details */}
            <div className="album-details">
                <h2>{albums[currentAlbum].title}</h2>
                <p>{albums[currentAlbum].description}</p>
            </div>
        </div>
    );
}

export default About;
