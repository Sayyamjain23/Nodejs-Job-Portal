import cors from 'cors'
import morgan from 'morgan'
import express from "express";
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from 'swagger-jsdoc'
import dotenv from 'dotenv';
import colors from "colors";

import 'express-async-errors';
import  connectDB  from './config/db.js';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js';
import jobsRoutes from './routes/jobsRoutes.js';
//security packages
import helmet from 'helmet';
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

dotenv.config();
connectDB();
//api config swagger
const options={
    definition:{
    openapi:"3.0.0",
    info:{
        title:'Job Portal Application',
        description:'Node Expressjs Job Portal Application'
    },
    servers:[
        {
            url:"https://localhost:8080"
        }
    ]
    },apis:['./routes/*.js']
}
const spec=swaggerDoc(options)

//rest object
const app=express();
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

//routes
app.use('/api/v1/test',testRoutes)
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/job', jobsRoutes)
app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(spec));
//validation middleware
app.use(errorMiddleware);

//port
const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is running In ${process.env.DEV_MODE} on port no. ${PORT}`.bgCyan.white);
})