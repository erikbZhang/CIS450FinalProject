
import { useNavigate } from 'react-router-dom';
import Typer from '../components/Typer';
import Nav from '../components/Nav';
import React, { useState } from 'react';

const options = [
  '', 'Playlist', 'Album', 'Artist'
];
const defaultOption = options[0];

const EmotionInput = () => {
  const history = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (selectedOption) {
      case 'playlist':
        history('/playlist');
        break;
      case 'album':
        history('/AlbumsOutput');
        break;
      case 'artist':
        history('/ArtistsOutput');
        break;
      default:
        alert('Please select an option from the dropdown.');
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
    setSelectedOption2(e.target.value);
  };


  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <Nav />
      <div className="text-center">
        <h2 className="text-4xl mb-8">How are you feeling today; we'll find you a <select
          value={selectedOption}
          onChange={handleDropdownChange}
          className="bg-white  rounded p-2"
        >
          <option value="">__</option>
          <option value="playlist">Playlist</option>
          <option value="album">Album</option>
          <option value="artist">Artist</option>
        </select>
        <Typer /></h2>
        
        <form onSubmit={handleSubmit}>
          <select
            value={selectedOption2}
            onChange={handleDropdownChange}
            className="bg-white  rounded p-2"
          >
            <option value="">Choose Your Emotion:</option>
            <option value="anger">Angry</option>
            <option value="anticipation">Anticipating</option>
            <option value="fear">Fearful</option>
            <option value="joy">Happy</option>
            <option value="negative">Negative</option>
            <option value="positive">Positive</option>
            <option value="sad">Sad</option>
            <option value="surprise">Surprised</option>
            <option value="trust">Trusting</option>
          </select>
          <button
            type="submit"
            className="bg-green-300 border-2 border-green-200 rounded px-4 py-2 ml-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmotionInput;
