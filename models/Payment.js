const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  amount: Number,
  status: { type: String, enum: ['pending', 'completed', 'failed'] },
  payment_method: {
    type: String,
    enum: ['credit_card', 'debit_card', 'digital_wallet']
  },
  details: mongoose.Schema.Types.Mixed,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
