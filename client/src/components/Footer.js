import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <table className='footer-table'>
        <tbody>
          <tr>
            <td className='footer-map'>
              <iframe
                title='University of Kelaniya Location'
                src='https://www.google.com/maps/d/embed?mid=1ViijYedCxvsv1UBpmTGfkiJkBZU&hl=en_US&ehbc=2E312F'
                height='200'
                allowfullscreen=''
                loading='lazy'
              ></iframe>
            </td>
            <td> "&nbsp" </td>
            <td>"&nbsp" </td>            
              


            <td className='footer-contact'>
              <div className='footer-contact-info'>
                <h2 style={{ color: 'white' }}>Contact Us</h2>
                <p style={{ color: 'white' }}>Email: info@dharmaloka.edu</p>
                <p style={{ color: 'white' }}>Phone: +123 456 7890</p>
                <p style={{ color: 'white' }}>Address: University of Kelaniya, Kelaniya, Sri Lanka</p>
              </div>
            </td>

          </tr>
        </tbody>
      </table>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              Dharmaloka
              <i className='fab fa-typo3' />
            </Link>
          </div>
          <small className='website-rights'>Dharmaloka © 2024</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link linkedin'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
