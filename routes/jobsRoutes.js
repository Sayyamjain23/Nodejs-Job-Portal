import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController,getAllJobsController,updateJobController,deleteJobController,jobStatsController } from '../controllers/jobController.js';
const router = express.Router();
//routes
//Create JOB
router.post('/create-job',userAuth,createJobController)
router.get('/get-job',userAuth,getAllJobsController)
//UPDATE JOB
router.patch('/update-job/:id',userAuth,updateJobController)
router.delete('/delete-job/:id',userAuth,deleteJobController)    
router.get('/job-stats',userAuth,jobStatsController)
export default router;