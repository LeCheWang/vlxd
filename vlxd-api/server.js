const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./configs/database');
const router = require('./routers');
const configuration = require('./configs/configuration');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Danh sách các origin được phép
const allowedOrigins = [
  'http://45.77.32.9:3001', 
  'https://45.77.32.9:3001', 
];

const corsOptions = {
  origin: function (origin, callback) {
    // Kiểm tra nếu origin nằm trong danh sách các origin được phép
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

app.use(cors(corsOptions));

router(app);
connectDB();

app.listen(configuration.PORT, () => {
  console.log('Server run at port ' + configuration.PORT);
});
