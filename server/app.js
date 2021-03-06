require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Health Checker app is listening on http://localhost:${PORT}`));
