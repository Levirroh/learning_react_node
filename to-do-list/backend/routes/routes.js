import express from "express";
import { getUsers} from "../controllers/user.js";
import {getTasks ,getDoneTasks, getDoingTasks, getToDoTasks} from "../controllers/tasks.js";

const router = express.Router();

router.get("/", getTasks, getUsers);


export default router;