const DeliveryHistory = require('../models/delivery-history.model');
const Product = require('../models/product.model');
const Account = require('../models/account.model');
const { isValidDate } = require('../validations/date.valid');
const ErrorResponse = require('../helpers/ErrorResponse');
const { formatDate, formatCurrencyVND } = require('../helpers/format');
const moment = require('moment');
const ExcelJS = require('exceljs');
const fs = require('fs');

module.exports = {
  getDeliveryHistories: async (req, res) => {
    const account = req.account;
    const { fromDate, toDate, username, agency_id, product_id } = req.query;

    const bodyQuery = {};

    if (isValidDate(fromDate)) {
      const targetDate = new Date(fromDate);
      const nextDay = isValidDate(toDate) ? new Date(toDate) : new Date();

      bodyQuery.createdAt = {
        $gte: targetDate,
        $lte: nextDay,
      };
    } else {
      const today = moment().startOf('day');
      bodyQuery.createdAt = {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate(),
      };
    }

    if (username) {
      const account = await Account.findOne({ username });
      bodyQuery.account = account?._id;
    }

    if (account.role === 'driver') {
      bodyQuery.account = account._id;
    }

    if (agency_id) {
      bodyQuery.agency = agency_id;
    }

    if (product_id) {
      bodyQuery.product = product_id;
    }

    const deliveryHistories = await DeliveryHistory.find(bodyQuery)
      .sort({
        createdAt: -1,
      })
      .populate('account')
      .populate('agency')
      .populate('product');

    return res.status(200).json(deliveryHistories);
  },
  createDeliveryHistory: async (req, res) => {
    const account = req.account;
    const body = req.body;

    const {
      trip_number,
      quantity,
      product,
      license_plates,
      product_import_price,
    } = body;

    if (!license_plates) {
      body.license_plates = account.license_plates;
    }

    const theProduct = await Product.findOne({
      _id: product,
      is_delete: false,
    });

    if (!theProduct) {
      throw new ErrorResponse(404, 'Mặt hàng không tồn tại');
    }

    if (account.role === 'admin') {
      const total_money = trip_number * quantity * product_import_price;
      body.total_money = total_money;
      body.is_import = true;
      if (!license_plates) {
        const account = await Account.findById(body.account);
        body.license_plates = account.license_plates;
      }
    } else if (account.role === 'driver') {
      const total_money = trip_number * quantity * theProduct.price;
      body.total_money = total_money;
      body.account = account._id;
    }

    const newDeliveryHistory = await DeliveryHistory.create(body);
    return res.status(201).json(newDeliveryHistory);
  },
  updateDeliveryHistory: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const updatedDeliveryHistory = await DeliveryHistory.findByIdAndUpdate(
      id,
      body,
      { new: true },
    );
    return res.status(200).json(updatedDeliveryHistory);
  },
  deleteDeliveryHistory: async (req, res) => {
    const id = req.params.id;
    const deletedDeliveryHistory = await DeliveryHistory.findByIdAndDelete(id);
    return res.status(200).json(deletedDeliveryHistory);
  },
  exportExcelFile: async (req, res) => {
    const { fromDate, toDate, username, agency_id, product_id } = req.query;
    let agency_name;

    const bodyQuery = { is_import: { $ne: true } };

    if (isValidDate(fromDate)) {
      const targetDate = new Date(fromDate);
      const nextDay = isValidDate(toDate) ? new Date(toDate) : new Date();

      bodyQuery.createdAt = {
        $gte: targetDate,
        $lte: nextDay,
      };
    } else {
      const today = moment().startOf('day');
      bodyQuery.createdAt = {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate(),
      };
    }

    if (username) {
      const account = await Account.findOne({ username });
      bodyQuery.account = account?._id;
    }

    if (agency_id) {
      bodyQuery.agency = agency_id;
    } else {
      throw new ErrorResponse(400, 'Cần lọc theo đại lý');
    }

    if (product_id) {
      bodyQuery.product = product_id;
    }

    const deliveryHistories = await DeliveryHistory.find(bodyQuery)
      .sort({
        createdAt: -1,
      })
      .populate('account')
      .populate('agency')
      .populate('product');

    const deliveryHistoryByMonth = {};

    // Lặp qua từng mục trong danh sách delivery history
    for (const delivery of deliveryHistories) {
      //nếu là chạy cước
      if (delivery?.is_postage) {
        !deliveryHistoryByMonth.chay_cuoc &&
          (deliveryHistoryByMonth.chay_cuoc = []);

        deliveryHistoryByMonth.chay_cuoc.push(delivery);
        continue;
      }
      // Lấy ngày tạo của delivery
      const createdAt = new Date(delivery.createdAt);
      // Lấy tháng tạo của delivery (từ 0 đến 11)
      const month = createdAt.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1

      // Nếu chưa có mục cho tháng này trong deliveryHistoryByMonth, tạo một mục mới
      if (!deliveryHistoryByMonth[`thang${month}`]) {
        deliveryHistoryByMonth[`thang${month}`] = [];
      }

      // Thêm delivery vào mục của tháng tương ứng
      deliveryHistoryByMonth[`thang${month}`].push(delivery);
    }

    const sheets = Object.keys(deliveryHistoryByMonth);

    const workbook = new ExcelJS.Workbook();

    const tongHop = {};
    //ghi các tháng và chạy cước
    for (let sheetName of sheets) {
      const deliveries = deliveryHistoryByMonth[sheetName];
      tongHop[sheetName] = {};

      if (deliveries.length > 0) {
        //ghi file excel
        const worksheet = workbook.addWorksheet(sheetName, {
          properties: { defaultColWidth: 20, defaultRowHeight: 20 },
        });
        //tên đại lý
        worksheet.mergeCells('A1:B1');
        const row1 = worksheet.getRow(1);

        row1.getCell(1).value = 'Khách Hàng ' + deliveries[0].agency.name;
        agency_name = deliveries[0]?.agency?.name;
        row1.getCell(1).alignment = { horizontal: 'center' };

        //title
        const row3 = worksheet.getRow(3);
        row3.getCell(1).value = 'Thời gian';
        row3.getCell(2).value = 'Biển số';
        row3.getCell(3).value = 'Mặt hàng';
        row3.getCell(4).value = 'Số chuyến';
        row3.getCell(5).value = 'Đơn vị/xe';
        row3.getCell(6).value = 'Tổng';
        row3.getCell(7).value = 'Đơn giá';
        row3.getCell(8).value = 'Thành tiền';

        //chỉnh màu, viền tiêu đề
        for (let i = 1; i <= 8; i++) {
          const cell = row3.getCell(i);
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF305496' }, // Mã màu xanh dương: FF305496
          };
          cell.font = {
            color: { argb: 'FFFFFFFF' },
          };

          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        }

        //data
        let i = 4;
        let sum_trip_number = 0;
        let sum_unit = 0;
        let sum_total_money = 0;

        //ghi từng dòng
        for (let delivery of deliveries) {
          //tính tổng
          sum_trip_number += delivery.trip_number;
          sum_unit += delivery.quantity * delivery.trip_number;
          sum_total_money += delivery.total_money;

          const row1 = worksheet.getRow(i);
          row1.getCell(1).value = formatDate(delivery.createdAt);
          row1.getCell(2).value = delivery.license_plates;
          row1.getCell(3).value = delivery.product.name;
          row1.getCell(4).value = delivery.trip_number;
          row1.getCell(5).value =
            delivery.quantity + ' ' + delivery.product.unit;
          row1.getCell(6).value =
            delivery.quantity * delivery.trip_number +
            ' ' +
            delivery.product.unit;
          row1.getCell(7).value = formatCurrencyVND(
            delivery.total_money / (delivery.quantity * delivery.trip_number),
          );
          row1.getCell(8).value = formatCurrencyVND(delivery.total_money);

          //chỉnh viền
          for (let i = 1; i <= 8; i++) {
            const cell = row1.getCell(i);
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          }

          i++;
        }

        //dòng cuối
        worksheet.mergeCells(`A${i}:C${i}`);

        const final_row = worksheet.getRow(i);

        tongHop[sheetName] = {
          sum_trip_number,
          sum_unit,
          sum_total_money,
        };

        final_row.getCell(1).value = 'Tổng Cộng';
        final_row.getCell(4).value = sum_trip_number;
        final_row.getCell(6).value = sum_unit;
        final_row.getCell(8).value = formatCurrencyVND(sum_total_money);
        //chỉnh màu, viền
        for (let i = 1; i <= 8; i++) {
          const cell = final_row.getCell(i);
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF808080' }, // Mã màu xanh dương: FF305496
          };
          cell.font = {
            color: { argb: 'FFFFFFFF' },
          };

          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        }
      }
    }

    //ghi tổng hợp
    const worksheetTongHop = workbook.addWorksheet('Tổng hợp', {
      properties: { defaultColWidth: 23, defaultRowHeight: 20 },
    });

    //dòng 2
    worksheetTongHop.mergeCells('A2:E2');

    const row2 = worksheetTongHop.getRow(2);
    row2.getCell(1).value = `BẢNG TỔNG HỢP CÔNG NỢ ${agency_name}`;
    row2.getCell(1).alignment = { horizontal: 'center' };

    //tiêu đề
    const row4 = worksheetTongHop.getRow(4);
    row4.getCell(1).value = 'STT';
    row4.getCell(2).value = 'Nội Dung';
    row4.getCell(3).value = 'Số chuyến';
    row4.getCell(4).value = 'Tổng số lượng';
    row4.getCell(5).value = 'Thành tiền';

    //chỉnh màu, viền tiêu đề dòng đầu tổng hợp
    for (let i = 1; i <= 5; i++) {
      const cell = row4.getCell(i);
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF305496' }, // Mã màu xanh dương: FF305496
      };
      cell.font = {
        color: { argb: 'FFFFFFFF' },
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    }

    let i = 5;
    let sumUnit = 0;
    let sumMoney = 0;
    for (let sheetName of sheets) {
      const row = worksheetTongHop.getRow(i);
      sumUnit += tongHop[sheetName].sum_unit || 0;
      sumMoney += tongHop[sheetName].sum_total_money || 0;

      row.getCell(1).value = i - 4; //STT từ 1
      row.getCell(2).value = sheetName;
      row.getCell(3).value = tongHop[sheetName].sum_trip_number || 0;
      row.getCell(4).value = tongHop[sheetName].sum_unit || 0;
      row.getCell(5).value = formatCurrencyVND(
        tongHop[sheetName].sum_total_money || 0,
      );
      i++;

      //taoj dduongvien
      for (let j = 1; j <= 5; j++) {
        const cell = row.getCell(j);
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      }
    }

    worksheetTongHop.mergeCells(`A${i}:B${i}`);
    const row_final = worksheetTongHop.getRow(i);
    row_final.getCell(1).value = 'Tổng Cộng';
    row_final.getCell(4).value = sumUnit;
    row_final.getCell(5).value = formatCurrencyVND(sumMoney);

    //chỉnh màu, đường viền cho dòng cuối tổng hợp
    for (let i = 1; i <= 5; i++) {
      const cell = row_final.getCell(i);
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF808080' }, // Mã màu xanh dương: FF305496
      };
      cell.font = {
        color: { argb: 'FFFFFFFF' },
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    }

    // let buffer = await workbook.xlsx.writeBuffer();
    const nowDate = new Date();

    const fileName = `exports_dai_ly_from_${fromDate || ''}_to_${
      toDate ||
      `${nowDate.getDate()}_${nowDate.getMonth() + 1}_${nowDate.getFullYear()}`
    }.xlsx`;

    const fileExcelPath = `./assets/excel/${fileName}`;

    await workbook.xlsx.writeFile(fileExcelPath);

    res.writeHeader(200, {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });

    const fileStream = fs.createReadStream(fileExcelPath);
    fileStream.pipe(res);
  },
};
