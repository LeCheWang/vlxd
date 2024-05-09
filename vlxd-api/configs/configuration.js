require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  SALT_ROUND: +process.env.SALT_ROUND,
  SECRET_KEY: process.env.SECRET_KEY,
  DB_URL: process.env.DB_URL,
  EXPIRES_IN: process.env.EXPIRES_IN,
  ADMIN_ACC: {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    full_name: 'admin',
    phone: 'admin',
    address: 'admin',
    license_plates: 'admin',
    role: 'admin',
  },
};
