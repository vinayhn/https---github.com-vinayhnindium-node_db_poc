/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import router from './router.js';
// import pool from './dbConfig.js';

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(session({
  secret: 'sessionsecretid',
  resave: true,
  saveUninitialized: true,
  maxAge: 3600000 * 2, // 1 hour (in milliseconds)
}));
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`server is listening to port ${port} `); });
