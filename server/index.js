const express =require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db.js');

const jobRoutes = require('./routes/jobRoutes.js')
const userRoutes = require('./routes/userRoutes.js')

dotenv.config()
connectDB()

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'https://fundifix-kallendevs-projects.vercel.app'

];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));



app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.use(morgan('dev'))

app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => res.send('FundiFix API is running...'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
