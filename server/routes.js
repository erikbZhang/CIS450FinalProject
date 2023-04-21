const mysql = require('mysql')
const config = require('./config.json')

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));

const match = async function(req, res) {
  const user_input_string = 'love love love i am so happy so excited so grateful';
  connection.query(`
    WITH UserInputScores AS (
        SELECT
            '${user_input_string}' AS user_string,
            SUM(Words.anger) AS anger_score,
            SUM(Words.anticipation) AS anticipation_score,
            SUM(Words.disgust) AS disgust_score,
            SUM(Words.fear) AS fear_score,
            SUM(Words.joy) AS joy_score,
            SUM(Words.negative) AS negative_score,
            SUM(Words.positive) AS positive_score,
            SUM(Words.sadness) AS sadness_score,
            SUM(Words.surprise) AS surprise_score,
            SUM(Words.trust) AS trust_score
        FROM
            Words
        WHERE
            LOWER('${user_input_string}') LIKE CONCAT('%', LOWER(Words.word), '%')
    ), TopSongs AS (
        SELECT
            se.artist,
            se.title,
            se.album,
            se.year,
            se.date,
            SQRT(
                POWER(UserInputScores.anger_score - se.anger_score, 2) +
                POWER(UserInputScores.anticipation_score - se.anticipation_score, 2) +
                POWER(UserInputScores.disgust_score - se.disgust_score, 2) +
                POWER(UserInputScores.fear_score - se.fear_score, 2) +
                POWER(UserInputScores.joy_score - se.joy_score, 2) +
                POWER(UserInputScores.negative_score - se.negative_score, 2) +
                POWER(UserInputScores.positive_score - se.positive_score, 2) +
                POWER(UserInputScores.sadness_score - se.sadness_score, 2) +
                POWER(UserInputScores.surprise_score - se.surprise_score, 2) +
                POWER(UserInputScores.trust_score - se.trust_score, 2)
            ) AS distance
        FROM
            SongEmotionScores se
            INNER JOIN UserInputScores
        ORDER BY
            distance
        LIMIT 10
    )
    SELECT *
    FROM TopSongs;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
}

const matchAlbum = async function(req, res) {
  const user_input_string = 'depression depression depression depression suicide suicide i hate living';
  connection.query(`
    WITH UserInputScores AS (
        SELECT
            '${user_input_string}' AS user_string,
            SUM(Words.anger) AS anger_score,
            SUM(Words.anticipation) AS anticipation_score,
            SUM(Words.disgust) AS disgust_score,
            SUM(Words.fear) AS fear_score,
            SUM(Words.joy) AS joy_score,
            SUM(Words.negative) AS negative_score,
            SUM(Words.positive) AS positive_score,
            SUM(Words.sadness) AS sadness_score,
            SUM(Words.surprise) AS surprise_score,
            SUM(Words.trust) AS trust_score,
            SQRT(
                POWER(SUM(Words.anger), 2) +
                POWER(SUM(Words.anticipation), 2) +
                POWER(SUM(Words.disgust), 2) +
                POWER(SUM(Words.fear), 2) +
                POWER(SUM(Words.joy), 2) +
                POWER(SUM(Words.negative), 2) +
                POWER(SUM(Words.positive), 2) +
                POWER(SUM(Words.sadness), 2) +
                POWER(SUM(Words.surprise), 2) +
                POWER(SUM(Words.trust), 2)
            ) AS input_score_norm
        FROM
            Words
        WHERE
            LOWER('${user_input_string}') LIKE CONCAT('%', LOWER(Words.word), '%')
    ), AlbumScores AS (
        SELECT
            ae.artist,
            ae.album,
            ae.total_anger_score,
            ae.total_anticipation_score,
            ae.total_disgust_score,
            ae.total_fear_score,
            ae.total_joy_score,
            ae.total_negative_score,
            ae.total_positive_score,
            ae.total_sadness_score,
            ae.total_surprise_score,
            ae.total_trust_score,
            SQRT(
                POWER(ae.total_anger_score, 2) +
                POWER(ae.total_anticipation_score, 2) +
                POWER(ae.total_disgust_score, 2) +
                POWER(ae.total_fear_score, 2) +
                POWER(ae.total_joy_score, 2) +
                POWER(ae.total_negative_score, 2) +
                POWER(ae.total_positive_score, 2) +
                POWER(ae.total_sadness_score, 2) +
                POWER(ae.total_surprise_score, 2) +
                POWER(ae.total_trust_score, 2)
            ) AS album_score_norm
        FROM
            AlbumEmotionScores ae
    ), TopAlbums AS (
        SELECT
            ascores.artist,
            ascores.album,
            SUM(UserInputScores.anger_score * ascores.total_anger_score)
                / (UserInputScores.input_score_norm * ascores.album_score_norm) AS cosine_similarity
        FROM
            UserInputScores,
            AlbumScores ascores
        GROUP BY
            ascores.artist,
            ascores.album,
            UserInputScores.input_score_norm,
            ascores.album_score_norm
        ORDER BY
            cosine_similarity DESC
        LIMIT 5
    )
    SELECT *
    FROM TopAlbums;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
}

const matchArtist = async function(req, res) {
  const user_input_string = 'depression depression depression depression suicide suicide i hate living';
  connection.query(`
  WITH UserInputScores AS (
    SELECT
      '${user_input_string}' AS user_string,
      SUM(Words.anger) AS anger_score,
      SUM(Words.anticipation) AS anticipation_score,
      SUM(Words.disgust) AS disgust_score,
      SUM(Words.fear) AS fear_score,
      SUM(Words.joy) AS joy_score,
      SUM(Words.negative) AS negative_score,
      SUM(Words.positive) AS positive_score,
      SUM(Words.sadness) AS sadness_score,
      SUM(Words.surprise) AS surprise_score,
      SUM(Words.trust) AS trust_score
    FROM
      Words
    WHERE
      LOWER('${user_input_string}') LIKE CONCAT('%', LOWER(Words.word), '%')
  ), TopArtists AS (
    SELECT
      ae.artist,
      SQRT(
        POWER(IFNULL(InputScores.anger_score, 0) - ae.total_anger_score/1000, 2) +
        POWER(IFNULL(InputScores.anticipation_score, 0) - ae.total_anticipation_score/1000, 2) +
        POWER(IFNULL(InputScores.disgust_score, 0) - ae.total_disgust_score/1000, 2) +
        POWER(IFNULL(InputScores.fear_score, 0) - ae.total_fear_score/1000, 2) +
        POWER(IFNULL(InputScores.joy_score, 0) - ae.total_joy_score/1000, 2) +
        POWER(IFNULL(InputScores.negative_score, 0) - ae.total_negative_score/1000, 2) +
        POWER(IFNULL(InputScores.positive_score, 0) - ae.total_positive_score/1000, 2) +
        POWER(IFNULL(InputScores.sadness_score, 0) - ae.total_sadness_score/1000, 2) +
        POWER(IFNULL(InputScores.surprise_score, 0) - ae.total_surprise_score/1000, 2) +
        POWER(IFNULL(InputScores.trust_score, 0) - ae.total_trust_score/1000, 2)
      ) AS distance
    FROM
      ArtistEmotionScores ae
      LEFT JOIN UserInputScores InputScores ON 1=1
    WHERE EXISTS (
      SELECT 1
      FROM ArtistEmotionScores
      WHERE artist = ae.artist AND (
        total_anger_score > 0 OR
        total_anticipation_score > 0 OR
        total_disgust_score > 0 OR
        total_fear_score > 0 OR
        total_joy_score > 0 OR
        total_negative_score > 0 OR
        total_positive_score > 0 OR
        total_sadness_score > 0 OR
        total_surprise_score > 0 OR
        total_trust_score > 0
      )
    )
    ORDER BY
      distance
    LIMIT 5
  )
  SELECT *
  FROM TopArtists;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
}

const misMatch = async function(req, res) {
  const user_input_string = 'fuck fuck kill myself hate living so depressed and anxious';
  connection.query(`
    WITH UserInput AS (
        SELECT
            '${user_input_string}' AS user_string
    ), UserInputScores AS (
        SELECT
            UserInput.user_string,
            SUM(CASE WHEN LOWER(UserInput.user_string) LIKE CONCAT('%', LOWER(Words.word), '%') THEN Words.anger ELSE 0 END) AS anger_score,
            SUM(CASE WHEN LOWER(UserInput.user_string) LIKE CONCAT('%', LOWER(Words.word), '%') THEN Words.anticipation ELSE 0 END) AS anticipation_score,
            SUM(CASE WHEN LOWER(UserInput.user_string) LIKE CONCAT('%', LOWER(Words.word), '%') THEN Words.disgust ELSE 0 END) AS disgust_score,
            SUM(CASE WHEN LOWER(UserInput.user_string) LIKE CONCAT('%', LOWER(Words.word), '%') THEN Words.fear ELSE 0 END) AS fear_score,
            SUM(CASE WHEN LOWER(UserInput.user_string) LIKE CONCAT('%', LOWER(Words.word), '%') THEN Words.joy ELSE 0 END) AS joy_score,
            SUM(CASE WHEN LOWER(UserInput.user_string) LIKE CONCAT('%', LOWER(Words.word), '%') THEN Words.negative ELSE 0 END) AS negative_score,
            SUM(CASE WHEN LOWER(UserInput.user_string) LIKE CONCAT('%', LOWER(Words.word), '%') THEN Words.positive ELSE 0 END) AS positive_score,
            SUM(CASE WHEN LOWER(UserInput.user_string) LIKE CONCAT('%', LOWER(Words.word), '%') THEN Words.sadness ELSE 0 END) AS sadness_score,
            SUM(CASE WHEN LOWER(UserInput.user_string) LIKE CONCAT('%', LOWER(Words.word), '%') THEN Words.surprise ELSE 0 END) AS surprise_score,
            SUM(CASE WHEN LOWER(UserInput.user_string) LIKE CONCAT('%', LOWER(Words.word), '%') THEN Words.trust ELSE 0 END) AS trust_score
        FROM
            UserInput
            CROSS JOIN Words
        WHERE
            EXISTS (SELECT 1 FROM Words WHERE LOWER(UserInput.user_string) LIKE CONCAT('%', LOWER(Words.word), '%'))
    ), TopSongs AS (
        SELECT
            se.artist,
            se.title,
            se.album,
            se.year,
            se.date,
            ABS(UserInputScores.anger_score - se.anger_score) +
            ABS(UserInputScores.anticipation_score - se.anticipation_score) +
            ABS(UserInputScores.disgust_score - se.disgust_score) +
            ABS(UserInputScores.fear_score - se.fear_score) +
            ABS(UserInputScores.joy_score - se.joy_score) +
            ABS(UserInputScores.negative_score - se.negative_score) +
            ABS(UserInputScores.positive_score - se.positive_score) +
            ABS(UserInputScores.sadness_score - se.sadness_score) +
            ABS(UserInputScores.surprise_score - se.surprise_score) +
            ABS(UserInputScores.trust_score - se.trust_score) AS distance
        FROM
            SongEmotionScores se
            INNER JOIN UserInputScores
        WHERE se.title NOT LIKE '%Notes%' AND se.title NOT LIKE '%Script%'
        ORDER BY
            distance DESC
        LIMIT 10
    )
    SELECT *
    FROM TopSongs;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
}

// GET /emotionPlaylist/:emotion
const emotionPlaylist = async function(req, res) {
  const { emotion } = req.params;
  connection.query(`
    SELECT s.song_id, s.title, s.artist, s.album, s.year, s.date, ss.${emotion}_score
    FROM Songs s
    JOIN (
      SELECT song_id,
            (anger_score + anticipation_score + disgust_score + fear_score +
              negative_score + positive_score + sadness_score + surprise_score +
              trust_score + joy_score) / 10 AS avg_score,
            ${emotion}_score
      FROM SongScores
    ) ss ON s.song_id = ss.song_id
    WHERE ss.${emotion}_score > ss.avg_score
    ORDER BY ss.${emotion}_score DESC
    LIMIT 10;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
}

// GET /emotionArtists/:emotion
const emotionArtists = async function(req, res) {
  const { emotion } = req.params;
  connection.query(`
    WITH ArtistAvgScore AS (
        SELECT s.artist,
              AVG(ss.anger_score) AS avg_anger_score,
              AVG(ss.anticipation_score) AS avg_anticipation_score,
              AVG(ss.disgust_score) AS avg_disgust_score,
              AVG(ss.fear_score) AS avg_fear_score,
              AVG(ss.joy_score) AS avg_joy_score,
              AVG(ss.negative_score) AS avg_negative_score,
              AVG(ss.positive_score) AS avg_positive_score,
              AVG(ss.sadness_score) AS avg_sadness_score,
              AVG(ss.surprise_score) AS avg_surprise_score,
              AVG(ss.trust_score) AS avg_trust_score
        FROM Songs s
        JOIN SongScores ss ON s.song_id = ss.song_id
        GROUP BY s.artist
    )
    SELECT artist, avg_${emotion}_score FROM ArtistAvgScore ORDER BY avg_${emotion}_score DESC LIMIT 5;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
}

// GET /emotionAlbums/:emotion
const emotionAlbums = async function(req, res) {
  const { emotion } = req.params;
  connection.query(`
    WITH AlbumAvgScore AS (
        SELECT s.artist, s.album,
              AVG(ss.anger_score) AS avg_anger_score,
              AVG(ss.anticipation_score) AS avg_anticipation_score,
              AVG(ss.disgust_score) AS avg_disgust_score,
              AVG(ss.fear_score) AS avg_fear_score,
              AVG(ss.joy_score) AS avg_joy_score,
              AVG(ss.negative_score) AS avg_negative_score,
              AVG(ss.positive_score) AS avg_positive_score,
              AVG(ss.sadness_score) AS avg_sadness_score,
              AVG(ss.surprise_score) AS avg_surprise_score,
              AVG(ss.trust_score) AS avg_trust_score
        FROM Songs s
        JOIN SongScores ss ON s.song_id = ss.song_id
        GROUP BY s.album
    )
    SELECT artist, album, avg_${emotion}_score FROM AlbumAvgScore ORDER BY avg_${emotion}_score DESC LIMIT 5;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
}

// GET /songEmotionScore/:song_title
const songEmotionScore = async function(req, res) {
  const { song_title } = req.params;
  connection.query(`
    SELECT artist, title, anger_score, anticipation_score, disgust_score, fear_score, joy_score,
          negative_score, positive_score, sadness_score, surprise_score, trust_score
    FROM SongScores
    WHERE title='${song_title}'
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
}

// GET /albumEmotionScore/:album_title
const albumEmotionScore = async function(req, res) {
  const { album_title } = req.params;
  connection.query(`
    WITH AlbumAvgScore AS (
        SELECT s.artist, s.album, s.year, s.date,
              AVG(ss.anger_score) AS avg_anger_score,
              AVG(ss.anticipation_score) AS avg_anticipation_score,
              AVG(ss.disgust_score) AS avg_disgust_score,
              AVG(ss.fear_score) AS avg_fear_score,
              AVG(ss.joy_score) AS avg_joy_score,
              AVG(ss.negative_score) AS avg_negative_score,
              AVG(ss.positive_score) AS avg_positive_score,
              AVG(ss.sadness_score) AS avg_sadness_score,
              AVG(ss.surprise_score) AS avg_surprise_score,
              AVG(ss.trust_score) AS avg_trust_score
        FROM Songs s
        JOIN SongScores ss ON s.song_id = ss.song_id
        GROUP BY s.album
    )
    SELECT * FROM AlbumAvgScore WHERE album='${album_title}';
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
}

// GET /artistEmotionScore/:artist
const artistEmotionScore = async function(req, res) {
  const { artist } = req.params;
  connection.query(`
    WITH ArtistAvgScore AS (
        SELECT s.artist,
              AVG(ss.anger_score) AS avg_anger_score,
              AVG(ss.anticipation_score) AS avg_anticipation_score,
              AVG(ss.disgust_score) AS avg_disgust_score,
              AVG(ss.fear_score) AS avg_fear_score,
              AVG(ss.joy_score) AS avg_joy_score,
              AVG(ss.negative_score) AS avg_negative_score,
              AVG(ss.positive_score) AS avg_positive_score,
              AVG(ss.sadness_score) AS avg_sadness_score,
              AVG(ss.surprise_score) AS avg_surprise_score,
              AVG(ss.trust_score) AS avg_trust_score
        FROM Songs s
        JOIN SongScores ss ON s.song_id = ss.song_id
        GROUP BY s.artist
    )
    SELECT * FROM ArtistAvgScore WHERE artist='${artist}'
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
}


module.exports = {
  match,
  matchAlbum, 
  matchArtist, 
  misMatch, 
  emotionPlaylist,
  emotionArtists, 
  emotionAlbums, 
  songEmotionScore,
  albumEmotionScore,
  artistEmotionScore
}
