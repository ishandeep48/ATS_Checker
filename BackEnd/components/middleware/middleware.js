import cors from 'cors';
import express from 'express'


export default function middlewares(app){
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({extended:true})); // wait why did i put it here
    
}
