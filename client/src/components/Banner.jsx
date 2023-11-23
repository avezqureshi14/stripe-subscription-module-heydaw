import React from 'react';
import img from '../images/heydaw.png';

const Banner = () => {
  return (
    <>
      <section className="home">
        <div className="imageContainer">
          <img src={img} alt="" srcset="" />
        </div>
     
      </section>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="waveShape"
      >
        <path
          fill="#5b54e0"
          fillOpacity="1"
          d="M0,224L48,197.3C96,171,192,117,288,117.3C384,117,480,171,576,213.3C672,256,768,288,864,282.7C960,277,1056,235,1152,208C1248,181,1344,171,1392,165.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </>
  );
};

export default Banner;
