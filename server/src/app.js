import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import index from './routes/index';

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    next();
});

const mongoDB = 'mongodb+srv://juliazenovskaya:julia1309199834402@cluster0-dbkj6.azure.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
      console.log('DB connected');

      app.use(logger('dev'));
      app.use(express.json());
      app.use(express.urlencoded({
        extended: false
      }));

      app.use('/', index);
    })
  .catch((err) => console.log('DB error', err));

export default app;
