import User from "../model/Users.js";
import {
  UserCredentialStructure,
  type UserMongooseRepositoryStructure,
  type UserWithoutPassword,
} from "../types";
import bcrypt from "bcrypt";
class UserMongooseRepository implements UserMongooseRepositoryStructure {
  getUser = async (
    username: string,
    userPassword: string,
  ): Promise<UserWithoutPassword> => {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("Username not found");
    }

    if (!(await bcrypt.compare(userPassword, user.password))) {
      throw new Error("Incorrect credentials");
    }

    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  };
}

export default UserMongooseRepository;
