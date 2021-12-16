import express from 'express'
import dotenv from "dotenv"; 
import path from 'path'   

import uploadRoutes from './routes/uploadRoutes.js'
import jobRoutes from './routes/jobRoutes.js'

dotenv.config();

const app = express();
app.use(express.json())

const router = express.Router();

app.use("/", router);

router.get("/", function (req, res) {
  const __dirname = path.resolve();
  res.sendFile(path.join(__dirname + "/index.html"));
});

// Routes
/*
    - Ability to upload jobs (Pobl)
    - Supplier to retrieve a list of their jobs
    - Supplier to retrieve a single job
    - Supplier to add appointment to job
    - Supplier to add stage to job
    - Authenicatation
*/
app.use('/api/upload', uploadRoutes)
app.use('/api/jobs', jobRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV}:${PORT}`));