import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../style/style.css'
import banner from '../assets/banner.png';

const HeroSection = () => {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`01/01/${year + 1}`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
 
  return (
    <div className='bg-primary bg-opacity-25 vh-101'>
      <Container >
        <Row className="no-gutters slider-text js-fullheight align-items-center justify-content-start" data-scrollax-parent="true">
          <Col xl={10} className="ftco-animate" data-scrollax="properties: { translateY: '70%' }">
            <h1 className="mb-4" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"> The Ethiopian Holy <br/><span></span></h1>
            <p className="mb-4" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"  style={{ fontFamily: 'Jaro, sans-serif'}}>June 30, 2024. Addis Ababa, Meskel Square</p>
            <div id="timer" className="d-flex mb-3">
              <div className="time" id="days">{timeLeft.days}</div>
              <div className="time pl-4" id="hours">{timeLeft.hours}</div>
              <div className="time pl-4" id="minutes"> {timeLeft.minutes}</div>
              <div className="time pl-4" id="seconds"> {timeLeft.seconds}</div>
            </div>
          </Col>
        </Row>
      </Container>
      <img src={banner} alt="banner" className="img-fluid start-0 w-100" style={{ objectFit: 'cover' }} />
    </div>
  );
}

export default HeroSection;
