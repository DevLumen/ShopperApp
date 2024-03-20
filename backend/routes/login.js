import express from 'express';
const router = express.Router();
import {login} from "../controllers/userController.js";

router.post("/", login);

export default router;