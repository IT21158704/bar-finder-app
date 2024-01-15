import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'
import { dbConfig } from './utils/dbConfig.js';
import userRouter from './routes/UserRoutes.js';
import storeRouter from './routes/StoreRoutes.js';
import productRouter from './routes/ProductRoutes.js';
import reviewRouter from './routes/ReviewRoutes.js';
import cors from 'cors';

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
dotenv.config();


app.use(morgan('dev'));
app.use(cors());
app.get('/', async (req,res)=>{
    res.status(200).json('Server is up and running');
})

//Common Routes
app.use('/',userRouter);
app.use('/store',storeRouter);
app.use('/product',productRouter);
app.use('/review',reviewRouter);

dbConfig().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is up and running on port ${port}`);
    })
}).catch((err)=>{
    console.log(err);
})

