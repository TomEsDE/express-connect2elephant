import express from 'express';
import http from 'http';
import { routesUser } from './routes/user';
import { routesOrder } from './routes/order';
import dotenv from 'dotenv';
import { BadRequestError, NotFoundError } from './js/HttpError';
import logRequest from './middleware/logRequest';
import morgan from 'morgan';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

console.log('NODE_ENV >> ', process.env.NODE_ENV);

const app = express();
// const port = process.env.PORT;

/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());

/** RULES OF OUR API */
app.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With,Content-Type,Accept, Authorization'
  );
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', '*');
    return res.status(200).json({});
  }
  next();
});

app.use(morgan('dev'));
app.use(logRequest);
/** Routes */
app.use('/user', routesUser);
app.use('/order', routesOrder);

/** images & co */
app.use(express.static('public'));

/** Error handling */
app.use((error, req, res, next) => {
  let status = 500;
  let errorMsg = '';
  if (error instanceof BadRequestError) {
    status = error.code;
    errorMsg = error.errorObj;
  } else if (error instanceof NotFoundError) {
    status = error.code;
    errorMsg = { error: error.message };
  } else if (error instanceof Error) {
    errorMsg = { error: error.message };
  } else errorMsg = error;

  console.log('error-middleware', errorMsg);

  return res.status(status).json(errorMsg);
});

// console.log(process.env.DB_CONFIG);

/** Server */
const httpServer = http.createServer(app);
const PORT = process.env.PORT ?? 3001;
httpServer.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
  console.log(`Example: http://localhost:${PORT}/user/1`);
});
