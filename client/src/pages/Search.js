
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

  const handleSubmit = (e) => {
    e.preventDefault();
    history('/SearchOutput');
    // switch (selectedOption) {
    //   //will leave this design choice to whoever does backend - can either redirect all to searchoutput, or make a new page for each case. think the first is more efficient
    //   // case 'playlist':
    //   //   history('/playlist');
    //   //   break;
    //   // case 'album':
    //   //   history('/AlbumsOutput');
    //   //   break;
    //   // case 'artist':
    //   //   history('/ArtistsOutput');
    //   //   break;
    //   default:
    //     alert('Please select an option from the dropdown.');
    // }
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
