const dotenv = require('dotenv');
const path = require('path');


dotenv.config({ path: path.join(__dirname, '../../.env') });


module.exports = {
  port: process.env.APP_PORT,
  // Set mongoose configuration
  mongoose: {
    url: process.env.MONGODB_URL ,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
