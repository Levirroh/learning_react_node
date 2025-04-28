import express from "express";
import { getUsers, register_user, login_user} from "../controllers/user.js";
import { getUserTeams, getStatusTeam, getTeamTasks, new_team_task} from "../controllers/teams.js";
import {get_tasks_user, new_task, update_task, get_task_by_id, delete_task, change_status} from "../controllers/tasks.js";

const router = express.Router();

router.post("/getUserTasks", get_tasks_user);
router.post("/createUser", register_user);
router.post("/loginUser", login_user)
router.post("/newTask", new_task)
router.post("/updateTask", update_task)
router.post("/changeStatus", change_status)
router.post("/getSubjects/", register_user);
router.post("/getUserTeams/", getUserTeams);
router.post("/getStatusTeam/", getStatusTeam);
router.post("/getTeamTasks", getTeamTasks);
router.post("/newTeamTask", new_team_task);


router.get("/getTaskById/:id", get_task_by_id)


router.delete("/delete/:id", delete_task)



export default router;