import { FastifyContextConfig, FastifyInstance } from "fastify";
import { ResourceAuthorizationException } from "../../../interfaces/exceptions/exception-handler";

const roles = (fastify: FastifyInstance) => {
  fastify.addHook("preValidation", async (req, res) => {
    const requestConfig = req.routeOptions.config as RequestWithRoleConfig;
    if (!requestConfig.role) {
      return;
    }
    const user = req.user as { id: string; role: string };

    if (requestConfig.role !== user.role) {
      throw new ResourceAuthorizationException();
    }
  });
};

export default roles;

interface RequestWithRoleConfig extends FastifyContextConfig {
  role?: string;
}
