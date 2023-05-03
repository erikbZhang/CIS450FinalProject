// src/pages/searchOutput.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userInput } from './globals';

import fetchMusicBrainzID from '../utils/fetchMusicBrainzID';
import fetchAlbumImage from '../utils/fetchAlbumImage';
const config = require('../config.json');



const AlbumsOutputSearch = () => {
  const history = useNavigate();
  // const [albums, setAlbums] = useState([]);
  // const userString = userInput.value;
  // useEffect(() => {
  //   fetch(`http://${config.server_host}:${config.server_port}/matchAlbums/${userString}`)
  //   .then(res => res.json())
  //   .then(resJson => setAlbums(resJson));
  // })
  // const [album, setAlbum] = useState(0);


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

  

  const album = userInput.value;
  console.log(album);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/albumEmotionScore/${album}`)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);

      if(Object.keys(resJson).length === 0) {
        window.alert('Album does not exist');
        return;
      }
      // asetAnger(resJson[0].avg_anger_score);
      // console.log(anger);
      setAnger(resJson[0].avg_anger_score);
      setAnticipation(resJson[0].avg_anticipation_score);
      setDisgust(resJson[0].avg_disgust_score);
      setFear(resJson[0].avg_fear_score);
      setNegativity(resJson[0].avg_negativity_score);
      setPositivity(resJson[0].avg_positivity_score);
      setHappiness(resJson[0].avg_happiness_score);
      setSadness(resJson[0].avg_sadness_score);
      setSurprise(resJson[0].avg_surprise_score);
      setTrust(resJson[0].avg_trust_score);
      console.log(anger);
      setAlbum(album);
      setArtist(resJson[0].artist);
      
    });
  });
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

export default AlbumsOutputSearch;
