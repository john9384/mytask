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
}
