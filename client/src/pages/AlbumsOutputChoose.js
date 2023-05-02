// src/pages/AlbumsOutputChoose.js
import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userInputEmotion } from './globals';

const config = require('../config.json');

const AlbumsOutputChoose = () => {
  const history = useNavigate();
  const [albums, setAlbums] = useState([]);
  const emotion = userInputEmotion.emotion;
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/emotionAlbums/${emotion}`)
    .then(res => res.json())
    .then(resJson => setAlbums(resJson));
  })

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
        <h2 className="text-4xl mb-8">Here's some recommended albums based on your emotion!</h2>
        <ul className="space-y-4">
          {albums.map((albums, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 bg-white p-4 rounded shadow-lg"
            >
              <b><span className="text-xl">{albums.album}</span></b>
              <i><span className="text-xl">{albums.artist}</span></i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlbumsOutputChoose;
