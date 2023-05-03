// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmotionInput from './pages/EmotionInput';
import Playlist from './pages/Playlist';
import ArtistsOutput from './pages/ArtistsOutput';
import Search from './pages/Search';
import Choose from './pages/Choose';
import AlbumsOutput from './pages/AlbumsOutput';
import PlaylistChoose from './pages/PlaylistChoose';
import AlbumsOutputChoose from './pages/AlbumsOutputChoose';
import ArtistOutputChoose from './pages/ArtistsOutputChoose';
import SongOutputSearch from './pages/SongOutputSearch';
import AlbumsOutputSearch from './pages/AlbumsOutputSearch';
import ArtistsOutputSearch from './pages/ArtistsOutputSearch';
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
        <Route path="/AlbumsOutputChoose" element={<AlbumsOutputChoose />} />
        <Route path="/ArtistsOutputChoose" element={<ArtistOutputChoose />} />
        <Route path="/PlaylistChoose" element={<PlaylistChoose />} />
        <Route path="/SongOutputSearch" element={<SongOutputSearch />} />
        <Route path="/ArtistsOutputSearch" element={<ArtistsOutputSearch />} />
        <Route path="/AlbumsOutputSearch" element={<AlbumsOutputSearch />} />
      </Routes>
    </Router>
  );
};

export default App;
