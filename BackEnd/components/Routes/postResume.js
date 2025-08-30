import express from 'express'
const router = express.Router()
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import { parsePDF } from '../helper/functions.js';
const storage = multer.memoryStorage();
const upload = multer({storage});

router.post('/upload', upload.single('file'), async (req,res)=>{
    
    try{
    const pdfBuffer = req.file.buffer;
    console.log(pdfBuffer)
    const targetJob = req.body.target;
    console.log(targetJob)
    const skillsData = await parsePDF(pdfBuffer)
    
    const skillSet = skillsData.join(' , ')
    
    const toSend ={
        skills : skillSet,
        target_job : targetJob
    }
    const response  = await axios.post('http://localhost:8000/predict',toSend)

    console.log(response.data)
    // const result = responjse.data
    res.send(response.data)
    }catch(err){
        console.log(err)
    }
})

export default router;