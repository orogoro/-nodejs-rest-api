const app = require('./app');
require('dotenv').config();
const { ConnectMongo } = require('./db/contacts');

// app.listen(3000, () => {
//   console.log('Server running. Use our API on port: 3000');
// });

ConnectMongo.then(() => {
  app.listen(process.env.PORT, function () {
    console.log(`Database connection successful`);
  });
}).catch((err) =>
  console.log(`Server not running. Error message: ${err.message}`)
);
