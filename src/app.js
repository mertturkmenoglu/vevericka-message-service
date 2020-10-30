const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const messageRoute = require('./routes/message');

app.use(express.json());
app.use(morgan('[:date[web]] || :method :url  || Status: :status || Response time: :response-time ms'));
app.use(cors());

const MONGOOSE_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.DB_CONNECTION, MONGOOSE_OPTIONS, () => {
	console.log('Connected to MongoDB database');
});

app.get('/', (req, res) => {
	return res.json({
		message: 'Vevericka Message Service',
	});
});

app.use('/message', messageRoute);

const PORT = process.env.PORT || 6767;
app.listen(PORT, () => {
	console.log(`Server started listening at port ${PORT}`);
});
