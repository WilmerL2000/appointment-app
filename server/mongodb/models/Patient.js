import mongoose from 'mongoose';

const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      trim: true,
    },
    dischargeDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    symptoms: {
      type: String,
      required: true,
      trim: true,
    },
    veterinary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vet',
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
