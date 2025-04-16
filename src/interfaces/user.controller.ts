import { GET, Controller } from "fastify-decorators";

@Controller({ route: "/user" })
export default class UserController {
  @GET("/")
  async getUser() {
    return {
      message: "Hello World",
    };
  }
}
