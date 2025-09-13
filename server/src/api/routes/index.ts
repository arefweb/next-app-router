import { Router } from 'express';
import { healthCheckController } from '@/api/controllers/health.controller.js';
import {
  signupController,
  loginController,
  refreshTokenController,
  logoutController,
} from '@/api/controllers/auth.controller.js';
import { isAuthenticated } from '@/api/middlewares/auth.middleware.js';
import User from '@/api/models/user.model.js';

const router = Router();


// --- Public Routes ---
router.get('/health', healthCheckController);

// --- Auth Routes ---
router.post('/auth/signup', signupController);
router.post('/auth/login', loginController);
router.post('/auth/refresh', refreshTokenController);
router.post('/auth/logout', logoutController);

// --- Protected Routes (require authentication) ---
router.get('/users/profile', isAuthenticated, async (req: any, res) => {
  // The user object is attached to the request by the isAuthenticated middleware
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password'] },
  });
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }
  return res.json(user);
});


export default router;
