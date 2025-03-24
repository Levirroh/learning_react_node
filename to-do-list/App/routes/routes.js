import express from "express";
import { getUsers, register_user, login_user} from "../controllers/user.js";
import {getTasks, new_task} from "../controllers/tasks.js";

const router = express.Router();

router.post("/getTasks", getTasks);

router.post("/createUser", register_user);
router.post("/loginUser", login_user)
router.post("/newTask", new_task)

export default router;