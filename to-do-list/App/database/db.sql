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
    creation_team DATETIME NOT NULL,
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

