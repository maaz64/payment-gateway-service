const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user_id: req.user.userId });
    res.json(transactions);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
