import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Task from "App/Models/Task";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class TasksController {
  public async index({ view, auth }: HttpContextContract) {
    const user = auth.user;
    await user?.preload("tasks");
    return view.render("tasks/index", { tasks: user?.tasks });
  }

  public async addTask({
    request,
    response,
    session,
    auth,
  }: HttpContextContract) {
    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [rules.maxLength(255)]),
      content: schema.string({ trim: true }, [rules.maxLength(500)]),
    });
    const validatedData = await request.validate({
      schema: validationSchema,
      messages: {
        "title.required": "Enter task title",
        "title.maxLength": "Task title can not exceed 225 characters",
        "content.maxLength": "Content cannot exceed 500 characters",
      },
    });
    await auth.user?.related("tasks").create({
      title: validatedData.title,
      content: validatedData.content,
    });
    // await Task.create({
    //   userId: auth.user?.id,
    //   title: validatedData.title,
    //   content: validatedData.content,
    // });
    session.flash("notification", "Task added!");
    return response.redirect("back");
  }

  public async markCompleted({
    response,
    session,
    params,
  }: HttpContextContract) {
    const task = await Task.findOrFail(params.id);
    task.isCompleted = true;
    await task.save();

    session.flash("notification", "Task updated!");

    return response.redirect("back");
  }

  public async markUncompleted({
    response,
    session,
    params,
  }: HttpContextContract) {
    const task = await Task.findOrFail(params.id);

    task.isCompleted = false;

    await task.save();

    session.flash("notification", "Task updated!");

    return response.redirect("back");
  }

  public async deleteTask({ params, session, response }: HttpContextContract) {
    const task = await Task.findOrFail(params.id);

    await task.delete();

    session.flash("notification", "Task deleted");

    return response.redirect("back");
  }
}
