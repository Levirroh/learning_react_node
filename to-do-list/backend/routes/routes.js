import express from "express";
import { getUsers} from "../controllers/user.js";
import {getTasks} from "../controllers/tasks.js";

const router = express.Router();

router.get("/", getTasks);


export default router;