/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", "PagesController.home").as("home");

Route.get("/signup", "AuthController.signup").as("signup");
Route.post("/signup", "AuthController.createUser");
Route.get("/login", "AuthController.login").as("login");
Route.post("/logout", "AuthController.logout");

Route.get("/tasks", "TasksController.index");
Route.post("/task", "TasksController.addTask");
Route.patch("/tasks/check/:id", "TasksController.markCompleted");
Route.patch("/tasks/uncheck/:id", "TasksController.markUncompleted");
Route.delete("/tasks/:id", "TasksController.deleteTask");
