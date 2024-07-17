const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const paymentRoutes = require('./paymentRoutes');
const transactionRoutes = require('./transactionRoutes');


router.use('/auth', authRoutes);
router.use('/payments', paymentRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router