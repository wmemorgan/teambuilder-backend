CREATE TABLE "Projects" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "pitch" varchar,
  "mvp" varchar,
  "stretch" varchar,
  "category" varchar
);

CREATE TABLE "Users" (
  "id" int PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "cohort" varchar,
  "email" varchar,
  "avatar" varchar,
  "project_manager" int,
  "preferred_role" int,
  "security_group" int
);

COMMENT ON COLUMN "Users"."avatar" IS 'url to their profile pic';

COMMENT ON COLUMN "Users"."project_manager" IS 'user ID';

CREATE TABLE "Roles" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "gradingRubric" varchar
);

COMMENT ON COLUMN "Roles"."gradingRubric" IS 'url to grading rubric';

CREATE TABLE "SecurityGroup" (
  "id" int PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "ProjectRoleAssignments" (
  "id" int PRIMARY KEY,
  "projectId" int,
  "role" int,
  "user_assignment" int
);

CREATE TABLE "ProjectSignUpBoard" (
  "id" int PRIMARY KEY,
  "projectId" int,
  "role" int,
  "user" int
);

CREATE TABLE "UserSettings" (
  "id" int PRIMARY KEY,
  "user_id" int,
  "app_start_page" varchar,
  "app_theme" varchar,
  "projects_per_page" int,
  "projects_status_sort" varchar,
  "users_per_page" int,
  "users_show_email" boolean
);

COMMENT ON COLUMN "UserSettings"."users_show_email" IS 'admin only setting';

ALTER TABLE "ProjectRoleAssignments" ADD FOREIGN KEY ("projectId") REFERENCES "Projects" ("id");

ALTER TABLE "ProjectRoleAssignments" ADD FOREIGN KEY ("role") REFERENCES "Roles" ("id");

ALTER TABLE "ProjectRoleAssignments" ADD FOREIGN KEY ("user_assignment") REFERENCES "Users" ("id");

ALTER TABLE "ProjectSignUpBoard" ADD FOREIGN KEY ("projectId") REFERENCES "Projects" ("id");

ALTER TABLE "ProjectSignUpBoard" ADD FOREIGN KEY ("role") REFERENCES "Roles" ("id");

ALTER TABLE "ProjectSignUpBoard" ADD FOREIGN KEY ("user") REFERENCES "Users" ("id");

ALTER TABLE "Users" ADD FOREIGN KEY ("security_group") REFERENCES "SecurityGroup" ("id");

ALTER TABLE "Users" ADD FOREIGN KEY ("preferred_role") REFERENCES "Roles" ("id");

ALTER TABLE "UserSettings" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");

ALTER TABLE "Users" ADD FOREIGN KEY ("id") REFERENCES "Users" ("project_manager");