require("dotenv").config();
const express = require('express');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes/index')
const swaggerSpecs = require('./config/swaggerOptions');
const morgan = require('morgan');
const logger = require('./config/logger');
const prometheus = require('express-prometheus-middleware');
const rateLimit = require('express-rate-limit');


const app = express();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Prometheus metrics middleware
app.use(prometheus({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  collectGCMetrics: true,
}));


const PORT = process.env.PORT || 3000;

// Connect to the database and then starting server
connectDB().then(() => {
  app.listen(PORT, () => {
      console.log(`Server is up and running at port ${PORT}`);
  })
})
.catch((err) => {
  console.log("MongoDB connection failed !!! ", err);
});


// Routes

app.get('/',(_,res)=>{
  return res.status(200).json({message:"Success"})
})
app.use('/api', router);

// Swagger setup
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
