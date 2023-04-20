const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));


app.get('/match', routes.match);
app.get('/matchAlbum', routes.matchAlbum);
app.get('/matchArtist', routes.matchArtist);
app.get('/misMatch', routes.misMatch);
app.get('/emotionPlaylist/:emotion', routes.emotionPlaylist);
app.get('/emotionArtists/:emotion', routes.emotionArtists);
app.get('/emotionAlbums/:emotion', routes.emotionAlbums);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
