import express from "express";
import { login_user} from "../controllers/user.js";
import { getUserTeams, getStatusTeam, getTeamTasks, new_team_task, createTeam, getTeamMembers, getTeamData, updateTeam, get_all_teams_data} from "../controllers/teams.js";
import {get_tasks_user, new_task, update_task, get_task_by_id, delete_task, change_status, get_all_tasks_data} from "../controllers/tasks.js";
import {create_new_chat, get_all_messages_unread_by_chat, get_chat_messages, get_chat_users, get_chats_user, new_chat_message, update_chat_users, update_read_message} from "../controllers/chats.js";


const router = express.Router();

//tasks
router.post("/getUserTasks", get_tasks_user);
router.post("/updateTask", update_task)
router.post("/changeStatus", change_status)
router.post("/newTask", new_task)
router.get("/getTaskById/:id", get_task_by_id)
router.delete("/delete/:id", delete_task)
router.post("/GetAllTasksData", get_all_tasks_data);

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
router.post("/GetAllTeamsData", get_all_teams_data);

//chat related

router.post("/getUserChats", get_chats_user);
router.post("/getChatMessages", get_chat_messages);
router.post("/newMessage", new_chat_message);
router.post("/createNewChat", create_new_chat);
router.post("/getChatUsers", get_chat_users);
router.post("/UpdateChatUsers", update_chat_users);
router.post("/GetAllUnreadMessagesByChat", get_all_messages_unread_by_chat);
router.post("/updateReadMessages", update_read_message);






export default router;