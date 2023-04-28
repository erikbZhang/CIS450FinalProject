// src/utils/fetchMusicBrainzID.js

import axios from 'axios';

const fetchMusicBrainzID = async (artist, album) => {
  try {
    const response = await axios.get(
      `https://musicbrainz.org/ws/2/release/?query=artist:${encodeURIComponent(
        artist
      )}+release:${encodeURIComponent(album)}&fmt=json`
    );

    const releases = response.data.releases;
    if (releases && releases.length > 0) {
      const release = releases[0];
      return release.id;
    }
  } catch (error) {
    console.error('Error fetching MusicBrainz ID:', error);
  }

  return null;
};

export default fetchMusicBrainzID;
