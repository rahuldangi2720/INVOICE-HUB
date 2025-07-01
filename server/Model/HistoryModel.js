const mongoose = require("mongoose");

const SubItemSchema = new mongoose.Schema({
  subitemname: { type: String, required: true },
  qty: { type: Number, required: true },
  rate: { type: Number, required: true },
});

const HistorySchema = new mongoose.Schema({
  items: [
    {
      itemname: { type: String, required: true },
      qty: { type: Number, required: true },
      rate: { type: Number, required: true },
      subitems: [SubItemSchema],
    },
  ],

  userId:{
     type:String
  },

  customerDetails: {
    customername: { type: String, required: true },
    address: { type: String, required: true },
    gstNo: { type: String, required: true },
  },

  transportDetails: {
    vehiclename: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
  },

  gst: {
    cgstPercent: { type: Number, required: true },
    sgstPercent: { type: Number, required: true },
    igstPercent: { type: Number, required: true },
  },

  totalAmount: { type: Number },
  cgstAmount: { type: Number },
  sgstAmount: { type: Number },
  igstAmount: { type: Number },
  totalAfterTax: { type: Number },
  State:{type: Number},
  InvoiceNo:{type: Number},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const HistoryModel = mongoose.model("History", HistorySchema);

module.exports = HistoryModel;
