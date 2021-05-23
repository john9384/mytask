import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
export default class AuthController {
  public signup({ view }: HttpContextContract) {
    return view.render("auth/signup");
  }
  public async createUser({ request, auth, response }: HttpContextContract) {
    const validationSchema = schema.create({
      name: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.maxLength(255),
        rules.unique({ table: "users", column: "email" }),
      ]),
      password: schema.string({ trim: true }, [rules.confirmed()]),
    });
    const validateData = await request.validate({
      schema: validationSchema,
    });

    const user = await User.create(validateData);

    await auth.login(user);

    return response.redirect("/");
  }
  public login({ view }: HttpContextContract) {
    return view.render("auth/login");
  }
  public async authenticate({
    request,
    auth,
    session,
    response,
  }: HttpContextContract) {
    const { email, password } = request.all();
    console.log(email, password);
    try {
      await auth.attempt(email, password);

      return response.redirect("/tasks");
    } catch (err) {
      session.flash("notification", "We couldn't verify your credentials.");

      return response.redirect("back");
    }
  }
  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();

    return response.redirect("/");
  }
}
