import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    try {
      const user = this.showUserProfileUseCase.execute({ user_id: `${user_id}` });
      return response.json(user);
    } catch (error) {
      if (error.message.match(/user not exists/)) {
        return response.status(404).json({ error: 'user not exists' });
      }
      response.json({ error: error.message })
    }
  }
}

export { ShowUserProfileController };
