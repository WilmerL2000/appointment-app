import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import connectDB from './mongodb/connect.js';
import vetRoutes from './routes/vetRoutes.js';
import patientRoutes from './routes/patientRoutes.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.use('/api/veterinary', vetRoutes);
app.use('/api/patients', patientRoutes);

const PORT = process.env.PORT || 6001;

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
