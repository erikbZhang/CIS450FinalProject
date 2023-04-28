// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmotionInput from './pages/EmotionInput';
import Playlist from './pages/Playlist';
import ArtistsOutput from './pages/ArtistsOutput';
import Search from './pages/Search';
import Choose from './pages/Choose';
import AlbumsOutput from './pages/AlbumsOutput';
import SearchOutput from './pages/SearchOutput';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<EmotionInput />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/ArtistsOutput" element={<ArtistsOutput />} />
        <Route path="/Choose" element={<Choose />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/AlbumsOutput" element={<AlbumsOutput />} />
        <Route path="/SearchOutput" element={<SearchOutput />} />
      </Routes>
    </Router>
  );
};

export default App;
