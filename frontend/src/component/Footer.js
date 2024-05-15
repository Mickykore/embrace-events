import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTwitter, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 bottom-0 w-100 h-auto" style={{ fontFamily: 'Ubuntu Sans, sans-serif'}}>
      <Container>
        <Row>
          <Col md={3}>
            <h2>Embrace Events</h2>
            <p>Organize your events with Embrace Events. Get access to a wide range of tools and features to manage your event effectively.</p>
          </Col>
          <Col md={3}>
            <h2>Useful Links</h2>
            <ul className="list-unstyled">
              {/* <li><a href="#">Speakers</a></li>
              <li><a href="#">Shcedule</a></li> */}
              <li><a href="#">Events</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h2>Privacy</h2>
            <ul className="list-unstyled">
              {/* <li><a href="#">Career</a></li> */}
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Services</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h2>Have a Questions?</h2>
            <ul className="list-unstyled">
              <li><span><FaMapMarkerAlt /></span><span className="text ps-2">Mekanisa Abo Mazoriya, Addis Ababa, Ethiopia</span></li>
              <li><span ><FaPhone /></span><a href="#"><span className="text ps-2">+251987298989</span></a></li>
              <li><span><FaEnvelope /></span><a href="#"><span className="text ps-2">info@embracevents.com</span></a></li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-center">
          <ul className="list-unstyled list-inline">
              {/* <li className="list-inline-item"><a href="#"><span className="icon-twitter"><FaTwitter size={26}/></span></a></li> */}
              <li className="list-inline-item"><a href="https://www.facebook.com/profile.php?id=61558596520935&mibextid=rS40aB7S9Ucbxw6v" target="_blank" rel="noopener noreferrer"><span className="icon-facebook"><FaFacebook size={26}/></span></a></li>
              <li className="list-inline-item"><a href="https://www.instagram.com/embracevents" target="_blank" rel="noopener noreferrer"><span className="icon-instagram"><FaInstagram size={26}/></span></a></li>
            </ul>
            <p>
              &copy;{new Date().getFullYear()} All rights reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
