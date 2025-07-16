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

-- name, image, color, categoru, owner

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

CREATE TABLE chat (
	id_chat INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_team INT, -- chave estrangeira opcional
    name_chat VARCHAR(100) NOT NULL,
    description_chat VARCHAR(255),
    image_chat TEXT,
    subject_chat VARCHAR(45),
    total_messages_chat INT DEFAULT 0,
    FOREIGN KEY (id_team) REFERENCES teams(id_team) -- caso exista uma tabela team
);

CREATE TABLE message (
	id_message INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
	id_chat INT NOT NULL,
    content_message TEXT NOT NULL,
    time_message DATETIME NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_chat) REFERENCES chat(id_chat)
);

CREATE TABLE chat_members (
    id_chat_member INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_chat INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_chat) REFERENCES chat(id_chat)
);

CREATE TABLE message_reads (
    id_message_read INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_message INT NOT NULL,
    read_at DATETIME NOT NULL DEFAULT NOW(),

    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_message) REFERENCES message(id_message),
    
    UNIQUE (id_user, id_message) -- garante que cada leitura de mensagem por usuário seja única
);

INSERT INTO users (name_user, function_user, email_user, password_user) 
VALUES ("teste","teste","teste","teste");

INSERT INTO users (name_user, function_user, email_user, password_user) 
VALUES ("admin","admin","admin","admin");

INSERT INTO task_status (name_status, color_task) 
VALUES ("ToDo", "vermelho");
INSERT INTO task_status (name_status, color_task) 
VALUES ("Doing", "amarelo");
INSERT INTO task_status (name_status, color_task) 
VALUES ("Done", "verde");

INSERT INTO teams (name_team, owner_team, color_team)
VALUES ("Time do teste", 1, "amarelo");
INSERT INTO teams (name_team, owner_team, color_team)
VALUES ("Time que convidaram o teste", 2, "azul");

INSERT INTO team_members(user_id, team_id, role_user)
VALUES(1, 1, "Administrador");
INSERT INTO team_members(user_id, team_id, role_user)
VALUES(2, 2, "Administrador");
INSERT INTO team_members(user_id, team_id, role_user)
VALUES(1, 2, "Moderador");
INSERT INTO team_members(user_id, team_id, role_user)
VALUES(2, 1, "Moderador");

INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task) 
VALUES ( 1 ,"ToDo","ToDo", "ToDo", 1);
INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task) 
VALUES (1 ,"Doing","Doing", "Doing", 2);
INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task) 
VALUES (1 ,"Done","Done", "Done", 3);

INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task, team_task) 
VALUES ( 1 ,"teamTask","teamTask", "teamTa	sk", 1, 1);
INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task, team_task) 
VALUES ( 1 ,"teamTask2","teamTask", "teamTask", 1, 1);
INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task, team_task) 
VALUES ( 1 ,"teamTask3","teamTask", "teamTask", 1, 1);


	
INSERT INTO chat (id_team, name_chat, description_chat)
VALUES (1, 'Chat do Time 1', 'Canal de comunicação do time 1');
INSERT INTO chat (id_team, name_chat, description_chat)
VALUES (1, 'Chat do Time 2', 'Canal de comunicação do time 2');

INSERT INTO chat_members (id_user, id_chat) VALUES (1, 1);
INSERT INTO chat_members (id_user, id_chat) VALUES (1, 2);
INSERT INTO chat_members (id_user, id_chat) VALUES (2, 1);
INSERT INTO chat_members (id_user, id_chat) VALUES (2, 2);


INSERT INTO message (id_user, id_chat, content_message, time_message)
VALUES (1, 1, 'EEAE?', NOW());
INSERT INTO message (id_user, id_chat, content_message, time_message)
VALUES (2, 1, 'Hello world', NOW());
INSERT INTO message (id_user, id_chat, content_message, time_message)
VALUES (1, 2, 'TIME 2 EBAAA?', NOW());
INSERT INTO message (id_user, id_chat, content_message, time_message)
VALUES (2, 2, 'ASDOIJASD', NOW());

UPDATE teams SET name_team = "time atualizado", image_team = null, color_team = "vermelho", category_team = "finanças" WHERE id_team = 2;
