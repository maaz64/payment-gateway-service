const express = require('express');
const router = express.Router();
const {createPayment, getPaymentStatus, handleRefund, processPayment} = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               payment_method:
 *                 type: string
 *                 enum: [credit_card, debit_card, digital_wallet]
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       500:
 *         description: Server error
 */
router.post('/', authenticateToken, createPayment);

/**
 * @swagger
 * /payments/process:
 *   post:
 *     summary: Process a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.post('/process', authenticateToken, processPayment);

/**
 * @swagger
 * /payments/{paymentId}/status:
 *   get:
 *     summary: Get the status of a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment status retrieved successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.get('/:paymentId/status', authenticateToken,getPaymentStatus);

/**
 * @swagger
 * /payments/{paymentId}/refund:
 *   post:
 *     summary: Handle a refund for a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment refunded successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
// router.post('/:paymentId/refund', handleRefund);
router.post('/:paymentId/refund', authenticateToken, handleRefund);

module.exports = router;

