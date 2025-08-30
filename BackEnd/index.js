import express from 'express'
const app = express();
import middlewares from './components/middleware/middleware.js';
import Routes from './components/Routes/index.js';
const PORT = 5000;
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

middlewares(app);
Routes(app);

app.use(express.static(path.join(__dirname,'dist')));
    // console.log(path.join(__dirname,'dist'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./dist/index.html'));
})
app.listen(PORT,(req,res)=>{
    console.log(`Server started at port ${PORT}`);
})