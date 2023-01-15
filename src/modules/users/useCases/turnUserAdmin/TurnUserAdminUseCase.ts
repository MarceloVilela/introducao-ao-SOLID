import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);

    if(!user || !user.id){
      throw new Error('non existing user');
    }

    const userTurned = this.usersRepository.turnAdmin(user);

    return userTurned;
  }
}

export { TurnUserAdminUseCase };
