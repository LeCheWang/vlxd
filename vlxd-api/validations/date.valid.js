function isValidDate(dateString) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(dateString)) {
    return false;
  }

  const [year, month, day] = dateString.split('-').map(Number);

  if (
    year < 1000 ||
    year > 9999 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return false;
  }

  // Kiểm tra xem ngày có hợp lệ trong ngữ cảnh thời gian
  const date = new Date(year, month - 1, day); // Lưu ý: tháng bắt đầu từ 0
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false;
  }

  // Kiểm tra năm nhuận
  if (month === 2 && day >= 29) {
    if (year % 4 !== 0 || (year % 100 === 0 && year % 400 !== 0)) {
      return false; // Nếu không phải là năm nhuận, tháng 2 không có 29 ngày
    }
  }

  return true;
}

module.exports = {
  isValidDate,
};
