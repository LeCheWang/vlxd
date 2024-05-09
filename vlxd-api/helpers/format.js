const dayjs = require('dayjs');

const formatDate = (dateString, format = 'D/MM/YYYY') => {
  if (dateString && dayjs(dateString).isValid()) {
    return dayjs(dateString).format(format);
  }

  return dateString;
};

function formatCurrencyVND(number) {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  });

  return formatter.format(number);
}

module.exports = {
  formatDate,
  formatCurrencyVND,
};
