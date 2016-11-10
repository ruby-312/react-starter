const User = require('../models/user');

//========================================
// Users Routes
//========================================
exports.usersProfile = function(req, res, next) {
  User.find(function(err, users) {
    if (err) {
      res.status(400).json({ error: 'No user could be found for this ID.' });
      return next(err);
    }
    res.status(200).json({ user: users });
    return next();
  });
}
