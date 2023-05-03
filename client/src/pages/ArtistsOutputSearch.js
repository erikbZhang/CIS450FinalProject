// src/pages/searchOutput.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userInput } from './globals';
import fetchMusicBrainzID from '../utils/fetchMusicBrainzID';
import fetchAlbumImage from '../utils/fetchAlbumImage';
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
import gaga from '../images/gaga.jpg'
import charliep from '../images/charliep.jpg';

const config = require('../config.json');

const ArtistsOutputSearch = () => {
  console.log("artist output search got here yea");

  const history = useNavigate();
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
    'Lady Gaga': gaga,
    'Selena Gomez': selenag,
  };

  const [imgSrc, setImgSrc] = useState(taylors);
  const [anger, setAnger] = useState(0);
  const [anticipation, setAnticipation] = useState(0);
  const [disgust, setDisgust] = useState(0);
  const [fear, setFear] = useState(0);
  const [happiness, setHappiness] = useState(0);

  const [negativity, setNegativity] = useState(0);
  const [positivity, setPositivity] = useState(0);
  const [sadness, setSadness] = useState(0);
  const [surprise, setSurprise] = useState(0);
  const [trust, setTrust] = useState(0);
  

  const artist = userInput.value;
  
  console.log(artist);
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/artistEmotionScore/${artist}`)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);

      if(Object.keys(resJson).length === 0) {
        window.alert('Artist does not exist');
        return;
      }

      setAnger(resJson[0].avg_anger_score);
      setAnticipation(resJson[0].avg_anticipation_score);
      setDisgust(resJson[0].avg_disgust_score);
      setFear(resJson[0].avg_fear_score);
      setNegativity(resJson[0].avg_negativity_score);
      setPositivity(resJson[0].avg_positivity_score);
      setSadness(resJson[0].avg_sadness_score);
      setSurprise(resJson[0].avg_surprise_score);
      setTrust(resJson[0].avg_trust_score);
      console.log(anger);
      setImgSrc(artistImages[artist]);
    });
  });
  console.log(anger);
  
  const emotions = [
    { label: 'Anger', value: anger },
    { label: 'Anticipation', value: anticipation },
    { label: 'Disgust', value: disgust },
    { label: 'Fear', value: fear },
    { label: 'Happiness', value: happiness },
    { label: 'Negativity', value: negativity },
    { label: 'Positivity', value: positivity },
    { label: 'Sadness', value: sadness },
    { label: 'Surprise', value: surprise },
    { label: 'Trust', value: trust },
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
      <div className="text-center w-4/5 flex items-start justify-around mt-16">
        <div>
          <img src={imgSrc} alt="Artist Image" className="w-128 h-128 rounded" />
        </div>
        <div>
          <h2 className="text-4xl mb-8">Emotion Analysis</h2>
          <ul className="space-y-4">
            {emotions.map((emotion, index) => (
              <li key={index} className="relative">
                <span className="text-xl absolute left-0 top-1/2 transform -translate-y-1/2">
                  {emotion.label}
                </span>
                <div
                  className="bg-green-200 h-4"
                  style={{ width: `${emotion.value * 20}px` }}
                ></div>
                <br></br>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArtistsOutputSearch;
