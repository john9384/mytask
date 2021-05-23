import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BasicsController {
  public index({ view }: HttpContextContract) {
    return view.render("general/home");
  }
}
