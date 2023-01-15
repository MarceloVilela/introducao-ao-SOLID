import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);

    if(user === undefined){
      throw new Error('user not exists');
    }

    if(!user.admin){
      throw new Error('access denied');
    }

    //console.log('listall', user_id, 'isAdmin', user.admin, this.usersRepository.list().length);

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
