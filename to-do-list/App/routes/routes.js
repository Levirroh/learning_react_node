import express from "express";
import { login_user} from "../controllers/user.js";
import { getUserTeams, getStatusTeam, getTeamTasks, new_team_task, createTeam, getTeamMembers, getTeamData, updateTeam} from "../controllers/teams.js";
import {get_tasks_user, new_task, update_task, get_task_by_id, delete_task, change_status} from "../controllers/tasks.js";
import {get_chats_user} from "../controllers/chats.js";


const router = express.Router();

//tasks
router.post("/getUserTasks", get_tasks_user);
router.post("/updateTask", update_task)
router.post("/changeStatus", change_status)
router.post("/newTask", new_task)
router.get("/getTaskById/:id", get_task_by_id)
router.delete("/delete/:id", delete_task)

//team taks
router.post("/newTeamTask", new_team_task);
router.post("/getTeamTasks", getTeamTasks);

//user related
router.post("/loginUser", login_user)

//teams related
router.post("/getStatusTeam/", getStatusTeam);
router.post("/getUserTeams/", getUserTeams);
router.post("/createTeam", createTeam);
router.post("/getTeamMembers", getTeamMembers)
router.post("/updateTeam", updateTeam)
router.post("/getTeamData", getTeamData);

//chat related

router.post("/chats", get_chats_user)






export default router;