DROP DATABASE IF EXISTS to_do_list_node; 
CREATE DATABASE to_do_list_node;
USE to_do_list_node;

CREATE TABLE users(
	id_user INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_user VARCHAR(90),
    function_user VARCHAR(45),
    email_user VARCHAR(90),
    password_user VARCHAR(255)
);

CREATE TABLE teams(
	id_team INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_team VARCHAR(90) NOT NULL,
    creation_team DATETIME ,
    image_team TEXT,
    color_team VARCHAR(16),
    category_team VARCHAR(100),
    owner_team INT NOT NULL,
	FOREIGN KEY (owner_team) REFERENCES users(id_user)
);

CREATE TABLE team_members(
	id_team_members INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    team_id INT NOT NULL,
    role_user ENUM("Administrador", "Moderador", "Visitante"),
    FOREIGN KEY (user_id) REFERENCES users(id_user),
    FOREIGN KEY (team_id) REFERENCES teams(id_team)
);

CREATE TABLE task_status(
	id_status INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_status VARCHAR(90),
	team_status INT,
    color_task VARCHAR(16),
	FOREIGN KEY (team_status) REFERENCES teams(id_team)
);

CREATE TABLE tasks(
	id_task INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_task INT NOT NULL,
    team_task INT,
    title_task VARCHAR(45),
	description_task TEXT,
	subject_task VARCHAR(45),
    date_task DATETIME,
    status_task INT,

    FOREIGN KEY (user_task) REFERENCES users(id_user),
    FOREIGN KEY (team_task) REFERENCES teams(id_team),
	FOREIGN KEY (status_task) REFERENCES task_status(id_status)
);

INSERT INTO users (name_user, function_user, email_user, password_user) 
VALUES ("teste","teste","teste","teste");

INSERT INTO users (name_user, function_user, email_user, password_user) 
VALUES ("admin","admin","admin","admin");

INSERT INTO task_status (name_status, color_task) 
VALUES ("ToDo", "red");
INSERT INTO task_status (name_status, color_task) 
VALUES ("Doing", "yellow");
INSERT INTO task_status (name_status, color_task) 
VALUES ("Done", "green");

INSERT INTO teams (name_team, owner_team)
VALUES ("Time do teste", 1);

INSERT INTO team_members(user_id, team_id, role_user)
VALUES(1, 1, "Administrador");


INSERT INTO teams (name_team, owner_team)
VALUES ("Time que convidaram o teste", 2);

INSERT INTO team_members(user_id, team_id, role_user)
VALUES(1, 2, "Moderador");


INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task) 
VALUES ( 1 ,"ToDo","ToDo", "ToDo", 1);
INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task) 
VALUES (1 ,"Doing","Doing", "Doing", 2);
INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task) 
VALUES (1 ,"Done","Done", "Done", 3);
SELECT * FROM users;

INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task, team_task) 
VALUES ( 1 ,"teamTask","teamTask", "teamTask", 1, 1);
INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task, team_task) 
VALUES ( 1 ,"teamTask2","teamTask", "teamTask", 1, 1);
INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task, team_task) 
VALUES ( 1 ,"teamTask3","teamTask", "teamTask", 1, 1);

SELECT * FROM tasks WHERE tasks.team_task = 1;
SELECT * FROM tasks WHERE user_task = 1;
SELECT * FROM tasks INNER JOIN task_status ON task_status.id_status = tasks.status_task WHERE tasks.user_task = 1 AND tasks.team_task IS NOT NULL;
SELECT * FROM tasks  WHERE tasks.team_task = 1;

SELECT * FROM teams;