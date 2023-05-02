// src/pages/searchOutput.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import fetchMusicBrainzID from '../utils/fetchMusicBrainzID';
import fetchAlbumImage from '../utils/fetchAlbumImage';


const ArtistsOutputSearch = () => {
  const history = useNavigate();
  // const [albums, setAlbums] = useState([]);
  // const userString = userInput.value;
  // useEffect(() => {
  //   fetch(`http://${config.server_host}:${config.server_port}/matchAlbums/${userString}`)
  //   .then(res => res.json())
  //   .then(resJson => setAlbums(resJson));
  // })
  const emotions = [
    { label: 'Anger', value: 25 },
    { label: 'Anticipation', value: 50 },
    { label: 'Disgust', value: 75 },
    { label: 'Fear', value: 30 },
    { label: 'Happiness', value: 60 },
    { label: 'Negativity', value: 40 },
    { label: 'Positivity', value: 80 },
    { label: 'Sadness', value: 20 },
    { label: 'Surprise', value: 55 },
    { label: 'Trust', value: 90 },
  ];
  const [albumImage, setAlbumImage] = useState('');

  const artist = "Taylor Swift";
  const album = "1989";

  useEffect(() => {
    const fetchImage = async () => {
      const musicBrainzID = await fetchMusicBrainzID(artist, album);
      if (musicBrainzID) {
        const imageUrl = await fetchAlbumImage(musicBrainzID);
        setAlbumImage(imageUrl);
      }
    };

    fetchImage();
  }, [artist, album]);
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
                  className="bg-green-200 h-4 w-full absolute left-32"
                  style={{ width: `${emotion.value}%` }}
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
