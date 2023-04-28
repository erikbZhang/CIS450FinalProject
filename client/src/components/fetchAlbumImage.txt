// src/utils/fetchAlbumImage.js

import axios from 'axios';

const fetchAlbumImage = async (musicBrainzID) => {
  try {
    const response = await axios.get(
      `https://coverartarchive.org/release/${musicBrainzID}`
    );

    const images = response.data.images;
    if (images && images.length > 0) {
      const image = images[0];
      return image.image;
    }
  } catch (error) {
    console.error('Error fetching album image:', error);
  }

  return null;
};

export default fetchAlbumImage;