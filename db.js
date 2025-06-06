const mongoose = require('mongoose');

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('connected', () => {
  console.log('Mongoose connection successful!');
});
db.on('error', () => {
  console.log('Mongoose connection error', err);
})