import express from "express";
import { getUsers, register_user, login_user} from "../controllers/user.js";
import {get_tasks, new_task, update_task} from "../controllers/tasks.js";

const router = express.Router();

router.post("/getTasks", get_tasks);

router.post("/createUser", register_user);
router.post("/loginUser", login_user)
router.post("/newTask", new_task)
router.get("/updateTask", update_task)



export default router;