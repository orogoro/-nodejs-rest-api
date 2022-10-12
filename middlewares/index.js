const MiddlewaresUsers = require('./validationMiddlewaresUsers');
const auth = require('./auth');
const middlewaresContacts = require('./validationMiddlewares');
const upload = require('./upload');

module.exports = {
  MiddlewaresUsers,
  auth,
  middlewaresContacts,
  upload,
};
