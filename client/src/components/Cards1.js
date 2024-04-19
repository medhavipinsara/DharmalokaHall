import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards1() {
  return (
    <div className='cards'>
      <h1>Facilities of Dharmaloka Hall</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>

            <CardItem
              src='../images/AirCon.jpg'
              text='Dharmaloka Hall offers a comfortable, air-conditioned environment for events.'
              label='Air Conditioned'

            />
            <CardItem
              src='../images/Seating.jpg'
              text='Enjoy the flexibility of our seating arrangement, where seats can be easily adjusted or removed to suit your needs.'
              label='Seating Arrangement'

            />
            <CardItem
              src='../images/Audio.jpg'
              text='Experience crystal-clear sound with our state-of-the-art audio system.'
              label='Audio System'

            />
          </ul>
          <ul className='cards__items'>

            <CardItem
              src='../images/Stage.jpg'
              text='A raised platform or stage area for speakers, performers, or event hosts.'
              label='Stage'

            />
            <CardItem
              src='../images/Lightning.jpg'
              text='Illuminate your event with our advanced lighting system.'
              label='Lightning System'

            />
            <CardItem
              src='../images/Dressing.jpg'
              text='Prepare in style with our convenient dressing rooms available for use.'
              label='Dressing Rooms'

            />
          </ul>
          <ul className='cards__items'>

            <CardItem
              src='../images/Parking.jpg'
              text='Benefit from convenient parking facilities available at Dharmaloka Hall.'
              label='Parking'

            />
            <CardItem
              src='../images/Restrooms.jpg'
              text='Clean and well-maintained restrooms for attendees.'
              label='Restrooms'

            />
            <CardItem
              src='../images/Access.jpg'
              text='Wheelchair ramps,and other facilities to ensure accessibility for all attendees.'
              label='Accessibility'

            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards1;


