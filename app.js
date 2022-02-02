const express = require('express')
const config = require('./config.js')
const cors = require('cors')
const path = require('path')

// Route Imports
const userRoutes = require('./routes/userRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const jobRoutes = require('./routes/jobRoutes')
const variationRoutes = require('./routes/variationRoutes')
const stageRoutes = require('./routes/stageRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')
const cancellationRoutes = require('./routes/cancellationRoutes')
const authRoutes = require('./routes/authRoutes.js')

const app = express();

app.use(express.json())

// Allow cors
app.use(cors())

// Set up router for routes
const router = express.Router();

// Default route for main page and possibly documentation for api
app.use("/", router);

router.get("/", function (req, res) {
  const __dirname = path.resolve();
  res.sendFile(path.join(__dirname + "/index.html"));
});

// Routes
app.use('/api/users', userRoutes.routes)
app.use('/api/uploads', uploadRoutes.routes)
app.use('/api/jobs', jobRoutes.routes)
app.use('/api/variations', variationRoutes.routes)
app.use('/api/stages', stageRoutes.routes)
app.use('/api/appointments', appointmentRoutes.routes)
app.use('/api/cancellations', cancellationRoutes.routes)
app.use('/api/auth', authRoutes.routes)

app.listen(config.port, () => console.log(`Server is listening on http://localhost:${config.port}`));