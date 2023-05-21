import express from 'express';
import {
  addPatient,
  deletePatient,
  getPatient,
  getPatients,
  updatePatient,
} from '../controllers/patientController.js';
import checkToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(checkToken, addPatient).get(checkToken, getPatients);
router
  .route('/:id')
  .get(checkToken, getPatient)
  .patch(checkToken, updatePatient)
  .delete(checkToken, deletePatient);

export default router;
