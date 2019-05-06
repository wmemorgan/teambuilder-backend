CREATE TABLE Projects (
  id serial PRIMARY KEY,
  name varchar NOT NULL,
  pitch text,
  mvp text,
  stretch text,
  category varchar,
  projectComplete boolean NOT NULL,
  created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE Users (
  id serial PRIMARY KEY,
  first_name varchar,
  last_name varchar,
  cohort varchar,
  email varchar,
  password varchar NOT NULL,
  avatar varchar,
  project_manager varchar,
  preferred_role varchar,
  security_group int,
  created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON COLUMN Users.avatar IS 'url to their profile pic';

COMMENT ON COLUMN Users.project_manager IS 'user ID';

CREATE TABLE Roles (
  id serial PRIMARY KEY,
  name varchar NOT NULL,
  gradingRubric varchar,
  created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON COLUMN Roles.gradingRubric IS 'url to grading rubric';

CREATE TABLE SecurityGroup (
  id serial PRIMARY KEY,
  name varchar NOT NULL,
  created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE Categories (
  id serial PRIMARY KEY,
  name varchar,
  created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ProjectRoleAssignments (
  id serial PRIMARY KEY,
  projectId int NOT NULL,
  roleId int,
  user_assignment int,
  created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ProjectSignUpBoard (
  id serial PRIMARY KEY,
  projectId int,
  roleId int,
  userId int,
  created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE UserSettings (
  id serial PRIMARY KEY,
  userId int UNIQUE,
  app_start_page varchar,
  app_theme varchar,
  projects_per_page int,
  projects_status_sort varchar,
  users_per_page int,
  users_show_email boolean,
  created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON COLUMN UserSettings.users_show_email IS 'admin only setting';

ALTER TABLE ProjectRoleAssignments ADD FOREIGN KEY (projectId) REFERENCES Projects (id);

ALTER TABLE ProjectRoleAssignments ADD FOREIGN KEY (roleId) REFERENCES Roles (id);

ALTER TABLE ProjectRoleAssignments ADD FOREIGN KEY (user_assignment) REFERENCES Users (id);

ALTER TABLE ProjectSignUpBoard ADD FOREIGN KEY (projectId) REFERENCES Projects (id);

ALTER TABLE ProjectSignUpBoard ADD FOREIGN KEY (roleId) REFERENCES Roles (id);

ALTER TABLE ProjectSignUpBoard ADD FOREIGN KEY (userId) REFERENCES Users (id);

ALTER TABLE Users ADD FOREIGN KEY (security_group) REFERENCES SecurityGroup (id);

ALTER TABLE Users ADD FOREIGN KEY (preferred_role) REFERENCES Roles (id);

ALTER TABLE UserSettings ADD FOREIGN KEY (userId) REFERENCES Users (id);
