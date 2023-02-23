import express from 'express';
import api from './routes/api/index';
const port: number = 4000;

const app = express();
app.use('/api', api);
app.listen(port, () => {
    console.log(`connection started at localhost:${port}`);
});

 
