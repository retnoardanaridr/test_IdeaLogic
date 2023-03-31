const express = require('express');
// require('dotenv').config();
const cors = require('cors');

const router = require('./src/routes');

const app = express();
const port = 8000;
// const port = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use('/api/v1/', router);

app.listen(port, () => console.log(`Listening on port ${port}!`));
