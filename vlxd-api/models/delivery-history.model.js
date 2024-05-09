const mongoose = require('mongoose');

const deliveryHistorySchema = mongoose.Schema(
  {
    trip_number: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    total_money: {
      type: Number,
      required: true,
    },
    account: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'account',
    },
    license_plates: {
      type: String,
      required: true,
    },
    is_postage: {
      type: Boolean,
      default: false,
    },
    is_import: {
      type: Boolean,
      default: false,
    },
    agency_import: {
      type: String,
    },
    product_import_price: {
      type: Number,
    },
    agency: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'agency',
    },
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'product',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('delivery-history', deliveryHistorySchema);
