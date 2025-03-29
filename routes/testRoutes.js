import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import {testPostController} from '../controllers/testController.js';
const router = express.Router();

router.post('/test-post',userAuth,testPostController)

export default router;