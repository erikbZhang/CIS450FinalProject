// src/pages/searchOutput.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userInput } from './globals';

import fetchMusicBrainzID from '../utils/fetchMusicBrainzID';
import fetchAlbumImage from '../utils/fetchAlbumImage';

const config = require('../config.json');


const SongOutputSearch = () => {
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
  const [artist, setArtist] = useState('');
  const [album1, setAlbum] = useState('');
  const history = useNavigate();
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
  const [albumImage, setAlbumImage] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const musicBrainzID = await fetchMusicBrainzID(artist, album1);
      if (musicBrainzID) {
        const imageUrl = await fetchAlbumImage(musicBrainzID);
        setAlbumImage(imageUrl);
      }
    };

    fetchImage();
  }, [artist, album1]);
  const song = userInput.value;

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/songEmotionScore/${song}`)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);

      if(Object.keys(resJson).length === 0) {
        window.alert('Song does not exist');
        return;
      }
      setAnger(resJson[0].anger_score);
      setAnticipation(resJson[0].anticipation_score);
      setDisgust(resJson[0].disgust_score);
      setFear(resJson[0].fear_score);
      setNegativity(resJson[0].negativity_score);
      setPositivity(resJson[0].positivity_score);
      setSadness(resJson[0].sadness_score);
      setSurprise(resJson[0].surprise_score);
      setTrust(resJson[0].trust_score);
      console.log(anger);
      setAlbum(resJson[0].album);
      setArtist(resJson[0].artist);
      // asetAnger(resJson[0].avg_anger_score);
      // console.log(anger);
    });
  });

  const goBack = () => {
    history('/');
  };
  console.log(albumImage);
  const imageSrc = {albumImage};
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <header className="fixed top-0 left-0 w-full bg-green-200 p-4">
        <button onClick={goBack} className="text-2xl font-semibold">
          emotiplay
        </button>
      </header>
      <div className="text-center w-4/5 flex items-start justify-around mt-16">
        <div>
          <img src={albumImage} alt="Album Cover" className="w-128 h-128 rounded" />
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

export default SongOutputSearch;
