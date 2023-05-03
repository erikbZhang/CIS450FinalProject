
import { useNavigate } from 'react-router-dom';
import Typer from '../components/Typer';
import Nav from '../components/Nav';
import React, { useState } from 'react';
import { userInput } from './globals';


const options = [
  '', 'Playlist', 'Album', 'Artist'
];
const defaultOption = options[0];

const EmotionInput = () => {
  const history = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    userInput.value = e.target.elements.input.value;
    
    switch (selectedOption) {

      case 'playlist':
        history('/SongOutputSearch');
        break;
      case 'album':
        history('/AlbumsOutputSearch');
        break;
      case 'artist':
        history('/ArtistsOutputSearch');
        break;
      default:
        alert('Please select an option from the dropdown.');
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };


  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <Nav />
      <div className="text-center">
        <h2 className="text-4xl mb-8">Choose a <select
          value={selectedOption}
          onChange={handleDropdownChange}
          className="bg-white  rounded p-2"
        >
          <option value="">__</option>
          <option value="playlist">Song</option>
          <option value="album">Album</option>
          <option value="artist">Artist</option>
        </select> to emotionally analyze!
        <Typer /></h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="input"
            className="bg-white border-2 border-green-200 rounded p-2 w-2/3"
            placeholder="Enter the song, album, or artist you want to analyze."
            autoFocus
          />
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
