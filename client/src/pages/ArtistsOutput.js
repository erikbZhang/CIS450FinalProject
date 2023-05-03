// src/pages/ArtistsOutput.js
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
import charliep from '../images/charliep.jpg';
import gaga from '../images/gaga.jpg';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userInput } from './globals';

const config = require('../config.json');

const ArtistsOutput = () => {
  const artistImages = {
    'Taylor Swift': taylors,
    'Ed Sheeran': eds,
    'Justin Bieber': justinb,
    'Ariana Grande': arianag,
    'Beyoncé': beyonce,
    'Billie Eilish': biliee,
    'BTS (방탄소년단)': bts,
    'Cardi B': cardib,
    'Coldplay': coldplay,
    'Charlie Puth': charliep,
    'Drake': drake,
    'Dua Lipa': dual,
    'Eminem': eminem,
    'Katy Perry': katyp,
    'Khalid': khalid,
    'Maroon 5': maroon5,
    'Nicki Minaj': nickim,
    'Post Malone': postm,
    'Rihanna': rihanna,
    'Selena Gomez': selenag,
    'Lady Gaga': gaga,
  };
  const history = useNavigate();
  const [imgSrc, setImgSrc] = useState(taylors);
  const [artists, setArtists] = useState([]);
  const userString = userInput.value;
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/matchArtist/${userInput.value}`)
      .then((res) => res.json())
      .then((resJson) => {
        setArtists(resJson);
        setImgSrc(
          resJson.map((artist) => artistImages[artist.artist])
        );
      });
  }, []);

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
          {artists.map((artist, index) => (
              <li
                key={index}
                className="flex items-center space-x-4 bg-white p-4 rounded shadow-lg"
              >
                <img src={imgSrc[index]} alt="Artist Image Here" className="w-16 h-16 rounded" />
                <span className="text-xl">{artist.artist}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistsOutput;