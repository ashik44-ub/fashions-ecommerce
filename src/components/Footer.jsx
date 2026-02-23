import React from 'react'
import { Link } from 'react-router-dom'
import img1 from "../assets/instagram-1.jpg"
import img2 from "../assets/instagram-2.jpg"
import img3 from "../assets/instagram-3.jpg"
import img4 from "../assets/instagram-4.jpg"
import img5 from "../assets/instagram-5.jpg"
import img6 from "../assets/instagram-6.jpg"

const Footer = () => {
  return (
    <>
    <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>CONTACT INFO</h4>
          <p>
            <span><i className="ri-map-pin-2-fill"></i></span>Dhaka, Bangladesh
          </p>
          <p>
            <span><i className="ri-mail-fill"></i></span>support@Lebaba.com
          </p>
          <p>
            <span><i className="ri-phone-fill"></i></span>(+088) 136982267
          </p>
        </div>
        <div className="footer__col">
          <h4>COMPANY</h4>
          <Link to="#">Home</Link>
          <Link to="#">About Us</Link>
          <Link to="#">Work With Us</Link>
          <Link to="#">Our Blog</Link>
          <Link to="#">Terms &amp; Conditions</Link>
        </div>
        <div className="footer__col">
          <h4>USEFUL LINK</h4>
          <Link to="#">Help</Link>
          <Link to="#">Track My Order</Link>
          <Link to="#">Men</Link>
          <Link to="#">Women</Link>
          <Link to="#">Dresses</Link>
        </div>
        <div className="footer__col">
          <h4>INSTAGRAM</h4>
          <div className="instagram__grid">
            <img src={img1} alt="instagram" /><img
              src={img5}
              alt="instagram"
            /><img src={img2} alt="instagram" />
            <img
              src={img3}
              alt="instagram"
            /><img src={img4} alt="instagram" /><img
              src={img6}
              alt="instagram"
            />
          </div>
        </div>
      </footer>
      <div className="footer__bar">
        Copyright © 2026 Copy Man. All rights reserved.
      </div>
    </>
  )
}

export default Footer