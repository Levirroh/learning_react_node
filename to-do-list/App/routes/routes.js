import express from "express";
import { getUsers, register_user, login_user} from "../controllers/user.js";
import {get_tasks, new_task, update_task, get_task_by_id, delete_task, change_status} from "../controllers/tasks.js";

const router = express.Router();

router.post("/getTasks", get_tasks);
router.post("/createUser", register_user);
router.post("/loginUser", login_user)
router.post("/newTask", new_task)
router.post("/updateTask", update_task)
router.post("/changeStatus", change_status)

router.get("/getTaskById/:id", get_task_by_id)

router.delete("/delete/:id", delete_task)



export default router;