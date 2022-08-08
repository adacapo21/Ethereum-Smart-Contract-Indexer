import { Router } from 'express';
import transactionRoutes from "./routes/transactionRoutes.js";

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api
 */
router.get('/', (req, res) => {
    res.json({
        app: req.app.locals.title,
        apiVersion: req.app.locals.version
    });
});

/**
 * Api for Transactions.
 */
router.use('/transactions', transactionRoutes);


export default router;