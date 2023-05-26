import express from 'express';
import {
  register,
  profile,
  confirm,
  authenticate,
  forgotPassword,
  findOutToken,
  newPassword,
  editProfile,
} from '../controllers/vetController.js';
import checkToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', register);
router.post('/login', authenticate);
router.get('/confirm/:token', confirm);
router.post('/forgot-password', forgotPassword);
// router.get('/forgot-password/:token', findOutToken);
// router.post('/forgot-password/:token', newPassword);
/* Create a route for the `/forgot-password/:token` endpoint. The `.get()` method is used to
handle GET requests to this endpoint. The `.post()` method is used to handle POST requests 
to this endpoint. This allows the user to first request a password reset token
via GET request, and then use that token to set a new password via POST request. */
router.route('/forgot-password/:token').get(findOutToken).post(newPassword);

router.get('/profile', checkToken, profile);
router.patch('/profile/:id', checkToken, editProfile);

export default router;
