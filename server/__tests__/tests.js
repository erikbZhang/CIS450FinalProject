const { expect } = require('@jest/globals');
const supertest = require('supertest');
const app = require('../server');
const results = require("./results.json");


/*app.get('/match', routes.match);
app.get('/matchAlbum', routes.matchAlbum);
app.get('/matchArtist', routes.matchArtist);
app.get('/misMatch', routes.misMatch);
app.get('/emotionPlaylist/:emotion', routes.emotionPlaylist);
app.get('/emotionArtists/:emotion', routes.emotionArtists);
app.get('/emotionAlbums/:emotion', routes.emotionAlbums);
app.get('/songEmotionScore/:song_title', routes.songEmotionScore);
app.get('/albumEmotionScore/:album_title', routes.albumEmotionScore);
app.get('/artistEmotionScore/:artist', routes.artistEmotionScore);*/


test('GET /match', async () => {
  await supertest(app).get('/match')
    .expect(200)
    .then((res) => {
      expect(res.body[0]).toStrictEqual({
        album: expect.any(String),
        artist: expect.any(String),
        date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z$/),
        distance: expect.any(Number),
        title: expect.any(String),
        year: expect.any(Number),
      });
    });
});

test('GET /matchAlbum', async () => {
  await supertest(app).get('/matchAlbum')
    .expect(200)
    .then((res) => {
      expect(res.body[0]).toStrictEqual({
        album: expect.any(String),
        artist: expect.any(String),
        cosine_similarity: expect.any(Number),
      });
    });
});

test('GET /matchArtist', async () => {
  await supertest(app)
    .get('/matchArtist')
    .expect(200)
    .then((res) => {
      expect(res.body[0]).toStrictEqual({
        artist: expect.any(String),
        distance: expect.any(Number),
      });
    });
});

test('GET /misMatch', async () => {
  await supertest(app)
    .get('/misMatch')
    .expect(200)
    .then((res) => {
      expect(res.body[0]).toStrictEqual({
        album: expect.any(String),
        artist: expect.any(String),
        date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z$/),
        distance: expect.any(Number),
        title: expect.any(String),
        year: expect.any(Number),
      });
    });
});

test('GET /emotionPlaylist/:emotion', async () => {
  const emotion = 'happy';

  await supertest(app)
    .get(`/emotionPlaylist/${emotion}`)
    .expect(200);
});

test('GET /emotionPlaylist/:emotion', async () => {
  const emotion = 'afraid';

  await supertest(app)
    .get(`/emotionPlaylist/${emotion}`)
    .expect(200);
});

test('GET /emotionArtists/:emotion', async () => {
  const emotion = 'sad';

  await supertest(app)
    .get(`/emotionArtists/${emotion}`)
    .expect(200);
});

test('GET /emotionAlbums/:emotion', async () => {
  const emotion = 'angry';

  await supertest(app)
    .get(`/emotionAlbums/${emotion}`)
    .expect(200);
});

test('GET /emotionAlbums/:emotion returns empty object when no data is found', async () => {
  await supertest(app).get('/emotionAlbums/nonexistent_emotion')
    .expect(200)
    .then((res) => {
      expect(res.body).toStrictEqual({});
    });
});

test('GET /songEmotionScore/:song_title', async () => {
  const songTitle = 'Blank Space';
  const expectedResults = {
    anger_score: expect.any(Number),
    anticipation_score: expect.any(Number),
    artist: 'Taylor Swift',
    disgust_score: expect.any(Number),
    fear_score: expect.any(Number),
    joy_score: expect.any(Number),
    negative_score: expect.any(Number),
    positive_score: expect.any(Number),
    sadness_score: expect.any(Number),
    surprise_score: expect.any(Number),
    title: 'Blank Space',
    trust_score: expect.any(Number),
  };

  await supertest(app)
    .get(`/songEmotionScore/${songTitle}`)
    .expect(200)
    .then((res) => {
      expect(res.body[0]).toStrictEqual(expectedResults);
    });
});

test('GET /songEmotionScore/:song_title - returns empty object for non-existent song', async () => {
  const nonExistentSong = 'This Song Does Not Exist';
  await supertest(app).get(`/songEmotionScore/${nonExistentSong}`)
    .expect(200)
    .then((res) => {
      expect(res.body).toEqual({});
    });
});

test('GET /albumEmotionScore/:album_title', async () => {
  const albumTitle = 'Lover';
  const expectedResults = {
    album: 'Lover',
    artist: 'Taylor Swift',
    avg_anger_score: expect.any(Number),
    avg_anticipation_score: expect.any(Number),
    avg_disgust_score: expect.any(Number),
    avg_fear_score: expect.any(Number),
    avg_joy_score: expect.any(Number),
    avg_negative_score: expect.any(Number),
    avg_positive_score: expect.any(Number),
    avg_sadness_score: expect.any(Number),
    avg_surprise_score: expect.any(Number),
    avg_trust_score: expect.any(Number),
    date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z$/),
    year: expect.any(Number)
  };

  await supertest(app)
    .get(`/albumEmotionScore/${albumTitle}`)
    .expect(200)
    .then((res) => {
      expect(res.body[0]).toStrictEqual(expectedResults);
    });
});

test('GET /albumEmotionScore/:album_title - returns empty object for non-existent album', async () => {
  const nonExistentAlbum = 'This Album Does Not Exist';
  await supertest(app).get(`/songEmotionScore/${nonExistentAlbum}`)
    .expect(200)
    .then((res) => {
      expect(res.body).toEqual({});
    });
});

test('GET /artistEmotionScore/:artist', async () => {
  const artistName = 'Taylor Swift';
  const expectedResults = {
    artist: 'Taylor Swift',
    avg_anger_score: expect.any(Number),
    avg_anticipation_score: expect.any(Number),
    avg_disgust_score: expect.any(Number),
    avg_fear_score: expect.any(Number),
    avg_joy_score: expect.any(Number),
    avg_negative_score: expect.any(Number),
    avg_positive_score: expect.any(Number),
    avg_sadness_score: expect.any(Number),
    avg_surprise_score: expect.any(Number),
    avg_trust_score: expect.any(Number),
  };

  await supertest(app)
    .get(`/artistEmotionScore/${artistName}`)
    .expect(200)
    .then((res) => {
      expect(res.body[0]).toStrictEqual(expectedResults);
    });
});

test('GET /artistEmotionScore/:artist', async () => {
  const artistName = 'Ariana Grande';
  const expectedResults = {
    artist: 'Ariana Grande',
    avg_anger_score: expect.any(Number),
    avg_anticipation_score: expect.any(Number),
    avg_disgust_score: expect.any(Number),
    avg_fear_score: expect.any(Number),
    avg_joy_score: expect.any(Number),
    avg_negative_score: expect.any(Number),
    avg_positive_score: expect.any(Number),
    avg_sadness_score: expect.any(Number),
    avg_surprise_score: expect.any(Number),
    avg_trust_score: expect.any(Number),
  };

  await supertest(app)
    .get(`/artistEmotionScore/${artistName}`)
    .expect(200)
    .then((res) => {
      expect(res.body[0]).toStrictEqual(expectedResults);
    });
});

test('GET /artistEmotionScore/:artist', async () => {
  const artistName = 'Kanye West';
  const expectedResults = {
  };

  await supertest(app)
    .get(`/artistEmotionScore/${artistName}`)
    .expect(200)
    .then((res) => {
      expect(res.body).toEqual(expectedResults);
    });
});

test('GET /emotionAlbums/:emotion with non-existing emotion', async () => {
  const nonExistingEmotion = 'despise';
  await supertest(app)
    .get(`/emotionAlbums/${nonExistingEmotion}`)
    .expect(200)
    .then((res) => {
      expect(res.body).toEqual({});
    });
});

test('GET /emotionAlbums/:emotion with non-existing emotion', async () => {
  const nonExistingEmotion = 'antsy';
  await supertest(app)
    .get(`/emotionAlbums/${nonExistingEmotion}`)
    .expect(200)
    .then((res) => {
      expect(res.body).toEqual({});
    });
});

test('GET /emotionAlbums/:emotion', async () => {
  const emptyDataEmotion = 'joy';

  await supertest(app)
    .get(`/emotionAlbums/${emptyDataEmotion}`)
    .expect(200)
    .then((res) => {
      expect(res.body[0]).toEqual({
        album: expect.any(String),
        artist: expect.any(String),
        avg_joy_score: expect.any(Number),
      });
    });
});
