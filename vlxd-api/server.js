const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./configs/database');
const router = require('./routers');
const configuration = require('./configs/configuration');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Cấu hình CORS để cho phép tất cả các nguồn
// Cấu hình CORS
app.use(cors());

router(app);
connectDB();

app.listen(configuration.PORT, () => {
  console.log('Server run at port ' + configuration.PORT);
});
