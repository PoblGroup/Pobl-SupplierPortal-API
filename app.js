const express = require('express')
const config = require('./config.js')
const cors = require('cors')
const path = require('path')

const uploadRoutes = require('./routes/uploadRoutes')
const jobRoutes = require('./routes/jobRoutes')
const variationRoutes = require('./routes/variationRoutes')

const app = express();

app.use(cors())
app.use(express.json())

// Set up router for routes
const router = express.Router();

// Default route for main page and possibly documentation for api
app.use("/", router);

router.get("/", function (req, res) {
  const __dirname = path.resolve();
  res.sendFile(path.join(__dirname + "/index.html"));
});

// Routes
app.use('/api/uploads', uploadRoutes.routes)
app.use('/api/jobs', jobRoutes.routes)
app.use('/api/variations', variationRoutes.routes)

app.listen(config.port, () => console.log(`Server is listening on http://localhost:${config.port}`));



/*
    - Ability to upload jobs (Pobl)
    - Supplier to retrieve a list of their jobs
    - Supplier to retrieve a single job
    - Supplier to add appointment to job
    - Supplier to add stage to job
    - Authenicatation
*/