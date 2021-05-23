import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BasicsController {
  public index({ view, auth, response }: HttpContextContract) {
    if (auth.user) {
      return response.redirect("/tasks");
    } else {
      return view.render("general/home");
    }
  }
}
