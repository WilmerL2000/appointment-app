import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import connectDB from './mongodb/connect.js';
import vetRoutes from './routes/vetRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import helmet from 'helmet';
import morgan from 'morgan';
dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use(morgan('common'));

app.use(cors());

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
