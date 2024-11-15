import { Router } from "express";
import loginRequire from "../middleware/loginRequire.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.post('/send/:id', loginRequire, sendMessage);
router.get("/:id", loginRequire, getMessage);

export default router;