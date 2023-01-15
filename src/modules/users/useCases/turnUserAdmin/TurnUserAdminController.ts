import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) { }

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    try {
      const user = this.turnUserAdminUseCase.execute({ user_id: `${user_id}` });
      return response.json(user);
    } catch (error) {
      if (error.message.match(/non existing user/)) {
        return response.status(404).json({ error: 'non existing user' });
      }
      return response.json({ error: error.message })
    }
  }
}

export { TurnUserAdminController };
