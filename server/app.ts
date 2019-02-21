import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';

import setRoutes from './routes';

const app = express()
  , server = require('http').createServer(app);
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 9000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

let mongodbURI;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
  app.use(morgan('dev'));
}

mongoose.Promise = global.Promise;
mongoose.connect(mongodbURI, { useNewUrlParser: true })
  .then(db => {
    setRoutes(app);
    app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    if (!module.parent) {
      app.listen(app.get('port'), () => console.log(`Angular listening on port ${app.get('port')}`));
    }
  })
  .catch(err => console.error(err));

export { app };

