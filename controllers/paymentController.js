const Payment = require('../models/Payment');
const logger = require('../config/logger');
const Transaction = require('../models/Transaction');


exports.createPayment = async (req, res) => {
  const { amount, payment_method, details } = req.body;
  try {
    const newPayment = new Payment({
      user_id: req.user.userId,
      amount,
      status: 'pending',
      payment_method,
      details
    });
    await newPayment.save();
    logger.info(`Payment created: ${newPayment._id}`);
    res.status(201).json(newPayment);
  } catch (err) {
    logger.error(`Error creating payment: ${err.message}`);
    res.status(500).send('Server error');
  }
};

exports.processPayment = async (req, res) => {
  const { paymentId, status } = req.body;
  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      logger.warn(`Payment not found: ${paymentId}`);
      return res.status(404).send('Payment not found');
    }
    payment.status = status;
    await payment.save();

    if(status !=='pending'){
     await Transaction.create({
      transaction_id : payment._id,
      user_id: req.user.userId,
      amount: payment.amount,
      status,

     });
    }
    logger.info(`Payment processed: ${payment._id}`);
    res.json(payment);
  } catch (err) {
    logger.error(`Error processing payment: ${err.message}`);
    res.status(500).send('Server error');
  }
};

exports.getPaymentStatus = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      logger.warn(`Payment not found: ${paymentId}`);
      return res.status(404).send('Payment not found');
    }
    res.json(payment.status);
  } catch (err) {
    logger.error(`Error retrieving payment status: ${err.message}`);
    res.status(500).send('Server error');
  }
};

exports.handleRefund = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const payment = await Transaction.findById(paymentId);
    if (!payment) {
      logger.warn(`Payment not found: ${paymentId}`);
      return res.status(404).send('Payment not found');
    }
    payment.status = 'refunded';
    await payment.save();
    logger.info(`Payment refunded: ${payment._id}`);
    res.json(payment);
  } catch (err) {
    logger.error(`Error processing refund: ${err.message}`);
    res.status(500).send('Server error');
  }
};
