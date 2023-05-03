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

describe('GET /match', () => {
  test('returns 404 when userString parameter is missing', async () => {
    const response = await supertest(app).get('/match');
    expect(response.status).toBe(404);
  });

  test('returns 200 when userString parameter is present', async () => {
    const response = await supertest(app).get('/match/my_search_string');
    expect(response.status).toBe(200);
  });
});

test('GET /match', async () => {
  await supertest(app).get('/match')
    .expect(404);
});

test('GET /match/sadness', async () => {
  await supertest(app).get('/match/sadness')
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
    .expect(404);
});

describe('GET /matchAlbum', () => {
  test('returns 404 when userString parameter is missing', async () => {
    const response = await supertest(app).get('/matchAlbum');
    expect(response.status).toBe(404);
  });

  test('returns 200 when userString parameter is present', async () => {
    const response = await supertest(app).get('/matchAlbum/sad');
    expect(response.status).toBe(200);
  });
});

describe('GET /match/:userString', () => {
  test('returns status code 200 and a JSON object with album recommendations', async () => {
    const response = await supertest(app)
      .get('/match/happy songs')
      .expect(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  test('returns status code 400 if userString parameter is missing', async () => {
    const response = await supertest(app)
      .get('/match/')
      .expect(404);
  });
});

test('GET /matchArtist', async () => {
  await supertest(app)
    .get('/matchArtist')
    .expect(404);
});

describe('GET /matchArtist', () => {
  test('returns 404 when userString parameter is missing', async () => {
    const response = await supertest(app).get('/matchArtist');
    expect(response.status).toBe(404);
  });

  test('returns 200 when userString parameter is present', async () => {
    const response = await supertest(app).get('/matchArtist/my_search_string');
    expect(response.status).toBe(200);
  });
});

test('GET /misMatch', async () => {
  await supertest(app)
    .get('/misMatch')
    .expect(404);
});

test('GET /misMatch/sadness', async () => {
  await supertest(app).get('/misMatch/sadness')
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

test('GET /misMatch', async () => {
  await supertest(app).get('/misMatch')
    .expect(404)
    .then((res) => {
      expect(res.body[0]).toStrictEqual(undefined);
    });
});

describe('GET /misMatch', () => {
  test('returns 404 when userString parameter is missing', async () => {
    const response = await supertest(app).get('/misMatch');
    expect(response.status).toBe(404);
  });

  test('returns 200 when userString parameter is present', async () => {
    const response = await supertest(app).get('/misMatch/my_search_string');
    expect(response.status).toBe(200);
  });
});

test('GET /emotionPlaylist/:emotion', async () => {
  const emotion = 'happy';

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
    album: '1989',
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

describe('GET /albumEmotionScore', () => {
  test('returns 404 when userString parameter is missing', async () => {
    const response = await supertest(app).get('/albumEmotionScore');
    expect(response.status).toBe(404);
  });

  test('returns 200 when userString parameter is present', async () => {
    const response = await supertest(app).get('/albumEmotionScore/userinput');
    expect(response.status).toBe(200);
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

describe('GET /artistEmotionScore', () => {
  test('returns 404 when userString parameter is missing', async () => {
    const response = await supertest(app).get('/artistEmotionScore');
    expect(response.status).toBe(404);
  });

  test('returns 200 when userString parameter is present', async () => {
    const response = await supertest(app).get('/artistEmotionScore/userinput');
    expect(response.status).toBe(200);
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

