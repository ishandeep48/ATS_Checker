import express from 'express'
const app = express();
import middlewares from './components/middleware/middleware.js';
import Routes from './components/Routes/index.js';
const PORT = 5000;

middlewares(app);
Routes(app);


app.listen(PORT,(req,res)=>{
    console.log(`Server started at port ${PORT}`);
})