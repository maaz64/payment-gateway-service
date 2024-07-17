const express = require('express');
const router = express.Router();
const { getTransactions } = require('../controllers/transactionController');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get a list of user transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions retrieved successfully
 *       500:
 *         description: Server error
 */

router.get('/', authenticateToken, getTransactions);

module.exports = router;

