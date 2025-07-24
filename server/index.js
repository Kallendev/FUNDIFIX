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

app.use(cors())
app.use(express.json());

app.use(morgan('dev'))

app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => res.send('FundiFix API is running...'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
