import express from 'express';
import loginRequire from '../middleware/loginRequire.js';
import { getUserForSideBar } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', loginRequire, getUserForSideBar);


export default router;