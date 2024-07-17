const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  transaction_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Payment'
  },
  user_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  amount: Number,
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'] },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
