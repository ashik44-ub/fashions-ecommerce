import React, { useState, useEffect } from 'react';
import dealsImg from "../../assets/deals.png";
import { Link } from 'react-router-dom';

const Deals = () => {
  // ১. অফার শেষ হওয়ার সময় নির্ধারণ করুন (যেমন: মার্চের ১ তারিখ ২০২৬)
  const targetDate = new Date("March 1, 2026 00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // ২. কাউন্টডাউন লজিক ফাংশন
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    // ৩. কম্পোনেন্ট আনমাউন্ট হলে টাইমার বন্ধ করা
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealsImg} alt="deals" />
      </div>
      <div className="deals__content">
        <h5>Get Up To 20% Discount</h5>
        <h4>Deals Of This Month</h4>
        <p>
          Our Women's Fashion Deals of the Month are here to make your style
          dreams a reality without breaking the bank. Discover a curated
          collection of exquisite clothing, accessories, and footwear, all
          handpicked to elevate your wardrobe.
        </p>

        <div className="deals__countdown flex-wrap">
          <div className="deals__countdown__card">
            <h4>{String(timeLeft.days).padStart(2, '0')}</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>{String(timeLeft.hours).padStart(2, '0')}</h4>
            <p>Hours</p>
          </div>
          <div className="deals__countdown__card">
            <h4>{String(timeLeft.minutes).padStart(2, '0')}</h4>
            <p>Mins</p>
          </div>
          <div className="deals__countdown__card">
            <h4>{String(timeLeft.seconds).padStart(2, '0')}</h4>
            <p>Secs</p>
          </div>
        </div>

        <button className="btn mt-6">
          <Link to="/shop">Get Discount</Link>
        </button>
      </div>
    </section>
  );
};

export default Deals;