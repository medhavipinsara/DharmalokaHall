import React from 'react';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  const handlePlayVideo = () => {
    // Open a new window with the video URL
    window.open('/videos/video.mp4', '_blank');
  };

  return (
    <div className='hero-container'>
      <h1>DISCOVER DHARMALOKA HALL</h1>
      <p> Your event starts here!</p>
      <div className='hero-btns'>
        <Button
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={() => window.location.href = "/about"}
        >
          GET STARTED
        </Button>
        <Button
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={handlePlayVideo}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
