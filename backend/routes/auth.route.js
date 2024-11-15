import { Router } from "express";
import { singup, login, logout } from "../controllers/auth.controller.js";

const router = Router();

router.post('/login', login);

router.post('/signup', singup);

router.post('/logout', logout);

export default router;