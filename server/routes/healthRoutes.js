import { Router } from 'express';
import { getHealth, getDbHealth } from '../controllers/healthController.js';

const router = Router();

router.get('/', getHealth); // GET /api/health
router.get('/db', getDbHealth); // GET /api/health/db

export default router;