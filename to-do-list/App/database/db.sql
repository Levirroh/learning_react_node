CREATE DATABASE to_do_list_node;
USE to_do_list_node;

CREATE TABLE users(
	id_user INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_user VARCHAR(90),
    function_user VARCHAR(45),
    email_user VARCHAR(90),
    password_user VARCHAR(255)
);

CREATE TABLE tasks(
	id_task INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_task INT NOT NULL,
    FOREIGN KEY (user_task) REFERENCES users(id_user),
    title_task VARCHAR(45),
	description_task TEXT,
	subject_task VARCHAR(45),
    date_task DATETIME,
    status_task ENUM("ToDo", "Doing", "Done")
);

INSERT INTO users (name_user, function_user, email_user, password_user) 
VALUES ("teste","teste","teste","teste");

INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task) 
VALUES ( 1 ,"ToDo","ToDo", "ToDo", "ToDo");

INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task) 
VALUES (1 ,"Doing","Doing", "Doing", "Doing");
INSERT INTO tasks (user_task, title_task, description_task, subject_task, status_task) 
VALUES (1 ,"Done","Done", "Done", "Done");
SELECT * FROM users;
