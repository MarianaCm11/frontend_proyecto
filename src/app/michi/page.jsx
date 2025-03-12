"use client";
import React from 'react';
import './michi.css';
import { FaCat } from "react-icons/fa";

const MichiPage = () => {
  return (
    <div className="michi-container">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/Lz1Cf0LKA2I?si=v0dwPeIyW1X8qB5_&autoplay=1&loop=1&playlist=Lz1Cf0LKA2I"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="michi-video"
      ></iframe>
      
      <div className="michi-message">
        <FaCat style={{ marginRight: '10px' }} />
        Estas Viendo Michi Cine
      </div>
      <button
        onClick={() => window.history.back()}
        className="btn-regresar link"
      >
        Regresar
      </button>
    </div>
  );
};

export default MichiPage;
