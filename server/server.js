const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));


app.get('/match/:userString', routes.match);
app.get('/matchAlbum/:userString', routes.matchAlbum);
app.get('/matchArtist/:userString', routes.matchArtist);
app.get('/misMatch/:userString', routes.misMatch);
app.get('/emotionPlaylist/:emotion', routes.emotionPlaylist);
app.get('/emotionArtists/:emotion', routes.emotionArtists);
app.get('/emotionAlbums/:emotion', routes.emotionAlbums);
app.get('/songEmotionScore/:song_title', routes.songEmotionScore);
app.get('/albumEmotionScore/:album_title', routes.albumEmotionScore);
app.get('/artistEmotionScore/:artist', routes.artistEmotionScore);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
