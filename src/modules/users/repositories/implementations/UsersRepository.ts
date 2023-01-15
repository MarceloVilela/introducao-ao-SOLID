import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const userFounded = this.findByEmail(email);
    if (userFounded) {
      return userFounded;
    }

    let user = new User();
    user = {
      ...user,
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find(({ id: currentId }) => id === currentId);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(({ email: currentEmail }) => email === currentEmail);
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.map(({ email }) => email).indexOf(receivedUser.id);

    receivedUser.admin = true;
    this.users[userIndex] = { ...this.users[userIndex], ...receivedUser };

    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
