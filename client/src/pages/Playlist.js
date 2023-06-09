// src/pages/Playlist.js
import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userInput, userOpposite } from './globals';

const config = require('../config.json');

const Playlist = () => {

  const [songs, setSongs] = useState([]);
  const userString = userInput.value;
  useEffect(() => {
    if (userOpposite.opposite) {
      console.log("misMatch being run");
      fetch(`http://${config.server_host}:${config.server_port}/misMatch/${userString}`)
      .then(res => res.json())
      .then(resJson => setSongs(resJson));
    }
    else {
      console.log("normal match being run");
      fetch(`http://${config.server_host}:${config.server_port}/match/${userString}`)
      .then(res => res.json())
      .then(resJson => setSongs(resJson));
    }
    userOpposite.opposite = false;
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

export default Playlist;
