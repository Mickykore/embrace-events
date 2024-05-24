import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../style/style.css';
import { useSelector, useDispatch } from 'react-redux';
import { getTicketsThunk } from '../redux/ticketSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const dispatch = useDispatch();
  const { tickets, loading, error } = useSelector((state) => state.tickets);
  const navigate = useNavigate();

  console.log(tickets);

  useEffect(() => {
    dispatch(getTicketsThunk());
  }, [dispatch]);

  const calculateTimeLeft = () => {
    const june30ThisYear = new Date(new Date().getFullYear(), 5, 30);
    const difference = june30ThisYear - new Date();
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
  }, [timeLeft]);

  const handleImageClick = (ticket) => {
    navigate('/payment', { state: { ticket } });
  };

  return (
    <div className='bg-primary bg-opacity-25 vh-101'>
      {tickets.map((ticket, index) => (
        <Container key={index}>
          <Row className="no-gutters slider-text js-fullheight align-items-center justify-content-start" data-scrollax-parent="true">
            <Col xl={10} className="ftco-animate" data-scrollax="properties: { translateY: '70%' }">
              <h1 className="mb-4" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">
                {ticket.title}
              </h1>
              <p className="mb-4" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }" style={{ fontFamily: 'Jaro, sans-serif' }}>
                {ticket.location}
              </p>
              <div id="timer" className="d-flex mb-3">
                <div className="time" id="days">{timeLeft.days}</div>
                <div className="time pl-4" id="hours">{timeLeft.hours}</div>
                <div className="time pl-4" id="minutes">{timeLeft.minutes}</div>
                <div className="time pl-4" id="seconds">{timeLeft.seconds}</div>
              </div>
            </Col>
          </Row>
          <img 
            src={ticket.image.filePath || 'path_to_default_banner_image'} 
            alt="banner" 
            className="img-fluid start-0 w-100" 
            style={{ objectFit: 'cover', cursor: 'pointer' }} 
            onClick={() => handleImageClick(ticket)}
          />
        </Container>
      ))}
    </div>
  );
}

export default HeroSection;
