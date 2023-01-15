import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    try {
      const user = this.listAllUsersUseCase.execute({ user_id: `${user_id}` });
      return response.json(user);
    } catch (error) {
      if (error.message.match(/user not exists/)) {
        return response.status(400).json({ error: 'user not exists' });
      }

      if (error.message.match(/access denied/)) {
        return response.status(400).json({ error: 'access denied' });
      }

      response.json({ error: error.message })
    }
  }
}

export { ListAllUsersController };
