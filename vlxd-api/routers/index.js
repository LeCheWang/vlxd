const ErrorResponse = require('../helpers/ErrorResponse');
const errorHandle = require('../middlewares/error.handle');

const authRouter = require('./auth.router');
const accountRouter = require('./account.router');
const agencyRouter = require('./agency.router');
const productRouter = require('./product.router');
const deliveryHistoryRouter = require('./delivery-history.router');
const expenseRouter = require('./expense.router');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/accounts', accountRouter);
  app.use('/api/agencies', agencyRouter);
  app.use('/api/products', productRouter);
  app.use('/api/delivery-histories', deliveryHistoryRouter);
  app.use('/api/expenses', expenseRouter);

  app.use('*', (req, res, next) => {
    throw new ErrorResponse(404, 'Không tìm thấy trang');
  });
  app.use(errorHandle);
};
