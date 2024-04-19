import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function CardsAbout() {
  return (
    <div className='cards'>
      <h1>Unveiling the Essence of Kelaniya University's Cultural Epicenter!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='../images/img-home.jpg'
              text='Intellect Unleashed:
              "A riveting exchange of ideas at the Kelaniya University Debate left us all in awe of the power of intellect."'
              label='Debate'
            />
            <CardItem
              src='../images/image-1.jpg'
              text='Rotralia: "Rotralia was a remarkable concert which featured the renowned Sri Lankan band "Wayo" along with the winner of the Spotlight musical competition."'
              label='Musical'
            />

          </ul>
          <ul className='cards__items'>
            <CardItem
              src='../images/img-5.jpg'
              text='Theatrical Odyssey:
              "Dharmaloka Hall  became a stage ablaze with passion and talent, as the drama unfolded, leaving us spellbound and enriched by the power of storytelling."'
              label='Drama'

            />
            <CardItem
              src='../images/img-6.jpg'
              text='Achievement Gala: 
              "The award ceremony was a night of recognition and inspiration, honoring achievements that sparkled like stars."'
              label='Ceremony'

            />
            <CardItem
              src='../images/img-7.jpg'
              text='Orientation Expedition:
              "The starting point of a transformative journey, where new horizons were unveiled, friendships forged, and dreams ignited during the orientation session."'
              label='Orientation'

            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardsAbout;