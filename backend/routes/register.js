import express from 'express';
const router = express.Router();
import {register} from "../controllers/userController.js";

router.post("/", register);

export default router;