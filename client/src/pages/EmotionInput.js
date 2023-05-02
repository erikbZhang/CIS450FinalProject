import { userInput, userOpposite } from './globals';

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
  const [opposites, setOpposites] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    userOpposite.opposite = opposites;
    userInput.value = e.target.elements.input.value;

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
  };
  const handleCheckboxChange = (e) => {
    setOpposites(e.target.checked);
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
          <input
            type="text"
            name='input'
            className="bg-white border-2 border-green-200 rounded p-2 w-2/3"
            placeholder="Enter your emotion"
            autoFocus
          />
          <button
            type="submit"
            className="bg-green-300 border-2 border-green-200 rounded px-4 py-2 ml-4"
          >
            Submit
          </button>
        </form>
        {selectedOption === 'playlist' && (
          <div className="absolute top-20 right-0 p-2">
            <label htmlFor="opposites" className="inline-flex items-center cursor-pointer">
              <input
                id="opposites"
                type="checkbox"
                className="form-checkbox h-4 w-4 text-green-600"
                checked={opposites}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Suggest the Opposite of your Feelings!</span>
            </label>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default EmotionInput;
