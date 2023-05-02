// src/pages/PlaylistChoose.js
import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userInput, userInputEmotion } from './globals';

const config = require('../config.json');

const PlaylistChoose = () => {
  const [songs, setSongs] = useState([]);
  const emotion = userInputEmotion.emotion;
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/emotionPlaylist/${emotion}`)
    .then(res => res.json())
    .then(resJson => setSongs(resJson));
  })


  const history = useNavigate();

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
        <h2 className="text-4xl mb-8">Here's your playlist!</h2>
        <ul className="space-y-4">
          {songs.map((song, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 bg-white p-4 rounded shadow-lg"
            >
              <b><span className="text-xl">{song.title}</span></b>
              <i><span className="text-xl">{song.artist}</span></i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlaylistChoose;
