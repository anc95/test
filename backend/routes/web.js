const data = require('../models/data');
function initRoutes(app) {
  app.get('/', (req, resp) => {
    return resp.render('index');
  });

  app.get('/cpr', (req, resp) => {
    return resp.render('cpr');
  });

  app.get('/signup', (req, resp) => {
    return resp.render('signup');
  });

  app.get('/info', (req, resp) => {
    return resp.render('info');
  });

  app.get('/data', (req, resp) => {
    return resp.render('last');
  });

  app.get('/final', (req, resp) => {
    return resp.render('final');
  });

  app.get('/admin', (req, resp) => {
    return resp.render('adminlogin');
  });

  app.get('/admin/data', (req, res) => {
    if (req.session.user) {
      data
        .find({ status: { $ne: 'c' } }, null, { sort: { createdAt: -1 } })
        .exec((err, order) => {
          if (req.xhr) {
            return res.json(order);
          } else {
            return res.render('admin');
          }
          // return resp.render('admin/order',{order:order})
        });
    } else {
      return res.render('notfound');
    }
  });
}

module.exports = initRoutes;
