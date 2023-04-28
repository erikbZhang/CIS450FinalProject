// src/pages/ArtistsOutput.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import taylors from '../images/taylors.jpg';
import eds from '../images/eds.jpg';
import justinb from '../images/justinb.jpg';
import arianag from '../images/arianag.jpg';
import beyonce from '../images/beyonce.jpg';
import biliee from '../images/biliee.jpg';
import bts from '../images/bts.jpg';
import cardib from '../images/cardib.jpg';
import coldplay from '../images/coldplay.jpg';
import drake from '../images/drake.jpg';
import dual from '../images/dual.jpg';
import eminem from '../images/eminem.jpg';
import katyp from '../images/katyp.jpg';
import khalid from '../images/khalid.jpg';
import maroon5 from '../images/maroon5.jpg';
import nickim from '../images/nickim.jpg';
import postm from '../images/postm.jpg';
import rihanna from '../images/rihanna.jpg';
import selenag from '../images/selenag.jpg';


const ArtistsOutput = () => {
  const history = useNavigate();
  const songs = [
    { title: 'Taylor Swift', albumImage: taylors },
    { title: 'Ed Sheeran', albumImage: eds },
    { title: 'Justin Bieber', albumImage: justinb },
    // Add more songs here
  ];

  const goBack = () => {
    history('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <header className="fixed top-0 left-0 w-full bg-green-200 p-4">
        <button onClick={goBack} className="text-2xl font-semibold">
          emotiplay
        </button>
      </header>
      <div className="text-center">
        <h2 className="text-4xl mb-8">Here's some recommended artists based on your emotion!</h2>
        <ul className="space-y-4">
          {songs.map((song, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 bg-white p-4 rounded shadow-lg"
            >
              <img
                src={song.albumImage}
                alt={song.title}
                className="w-16 h-16 rounded"
              />
              <span className="text-xl">{song.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistsOutput;
