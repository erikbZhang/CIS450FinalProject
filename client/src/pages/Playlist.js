// src/pages/Playlist.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Playlist = () => {
  const history = useNavigate();
  const songs = [
    { title: 'Song 1', albumImage: '/path/to/image1.png' },
    { title: 'Song 2', albumImage: '/path/to/image2.png' },
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
        <h2 className="text-4xl mb-8">Here's your playlist!</h2>
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

export default Playlist;
