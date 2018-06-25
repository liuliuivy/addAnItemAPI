var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Item } = require('./models/item');
var { Log } = require('./models/log');

var app = express();
const port = process.env.PORT || 3000;
const maxLogsNum = 20;

app.use(bodyParser.json());

app.get('/logs', (req, res) => {
  Log.find().then((logs) => {
    res.send({ logs });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/logs', (req, res) => {
  Log.find({}, {}, { sort: { 'createdAt': 1 } })
    .then(logs => {
      if (logs[maxLogsNum - 1]) {
        Log.findByIdAndRemove(logs[0]._id).then(firstLog => {
          if (!firstLog) {
            return res.status(404).send();
          }
          ///res.send({ firstLog });
        }).catch((e) => {
          res.status(400).send();
        });
      }
    })

  var log = new Log({
    act: req.body.act,
    text: req.body.text,
    col: req.body.col,
    createdAt: (new Date()).getTime().toString()
  });

  log.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});



app.post('/items', (req, res) => {
  var item = new Item({
    id: req.body.id,
    text: req.body.text,
    col: req.body.col
  });

  item.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/items', (req, res) => {
  Item.find().then((items) => {
    res.send({ items });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.delete('/items/:id', (req, res) => {
  var id = req.params.id;

  if (!id) {
    return res.status(404).send();
  }

  Item.findOneAndRemove({ id }).then((item) => {
    if (!item) {
      return res.status(404).send();
    }

    res.send({ item });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };
