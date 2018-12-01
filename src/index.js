import express from 'express';
import cors from 'cors';
import Oilandgas from './api/resources/oilandgas/oilandgas.model';
import logger from 'morgan';
import cron from 'node-cron';
import Xray from 'x-ray';
const x = Xray({
  filters: {
    fix2: function(value) {
      if (typeof value === 'string') {
        let refine = value.split('p.p1');
        let refine2 = refine[0].split('\r\n\t\t');
        return refine2[1];
      }
    },
    fix: function(value) {
      if (typeof value === 'string') {
        let refine = value.split('\t\r\n\t\t\t\t');
        let refine2 = refine[1].split('\t');
        let refine3 = refine2[1].split('\r');
        return refine3[0];
      }
    }
  }
});

import { connect } from './config/db';
import { restRouter } from './api';

const app = express();
const PORT = process.env.PORT || 3000;

connect();

cron.schedule('1 * * * *', async function() {
  try {
    let found = false;
    await Oilandgas.find({}, (err, res) => {
      if (res || res == {}) {
        found = true;
      } else console.log(err);
    });

    if (found) {
      try {
        await Oilandgas.deleteMany({}, async function(err) {
          console.log('----- News Cleaned from database -----');
          x('https://www.oilandgaspeople.com/news/', {
            items: x('ul#newslistings li', [
              {
                heading: 'a h3 | fix',
                intro: 'a p:not(.smallText)',
                content: x('a@href', {
                  imgSrc: '#newspostcontainer img@src',
                  body: '#newspostcontainer .item-content | fix2'
                })
              }
            ])
          })(async function(err, obj) {
            if (err) {
              console.log(err);
            }
            const docs = await Oilandgas.insertMany(obj.items);
            if (!docs) {
              console.log("Didn't create News");
            }
            console.log('News created', docs);
          });
        });
      } catch (err) {
        console.log("Couldn't remove the docs", err);
      }
    }
  } catch (error) {
    console.log("Couldn't complete delete and insert process", error);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}
app.use('/', cors(), restRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid route';
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});
