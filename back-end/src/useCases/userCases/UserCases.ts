import { z } from "zod";

import { IUserRepository } from "../../models/userModel/interfaces";
import { IBCryptAdapter } from "../../adapters/IBcryptAdapter";
import { IJwtAdapter } from "../../adapters/IJwtAdapter";

import { UserErrors } from "../../errors/UserErrors";
import { 
  TRegisterRequest,
  registerRequestSchema,
  TSignInRequest,
  signInRequestSchema
} from "./validations";

export class UserCases {
  constructor(
    private userRepository: IUserRepository,
    private bcryptAdapter: IBCryptAdapter,
    private jwtAdapter: IJwtAdapter,
  ){};

  async register (request: TRegisterRequest) {
    const validationRequest = registerRequestSchema
    .parseAsync(request);

    try {
     await validationRequest
    } catch (error) {
      const zodError = error as z.ZodError;
      const validationErrors: Record<string, string> = {};
      
      zodError.errors.forEach((error) => {
        if ( !error.path ) return;
        validationErrors[error.path[0]] = error.message
      });

      throw new UserErrors(validationErrors, 400);
    };

    const {userName, password} = await validationRequest;
    
    const user = await this.userRepository.findUser({userName});

    if(user) {
      throw new UserErrors({error: "A user with that name already exists."}, 409);
    };

    const passwordHash = await this.bcryptAdapter.hashEncrypt({password});

    await this.userRepository.create({
      user_name: userName,
      password: passwordHash,
    });

    return {
      userName,
      password
    };
  };

  async signIn (request: TSignInRequest) {
    const validationRequest = signInRequestSchema
    .parseAsync(request);

    try {
     await validationRequest
    } catch (error) {
      const zodError = error as z.ZodError;
      const validationErrors: Record<string, string> = {};
      
      zodError.errors.forEach((error) => {
        if ( !error.path ) return;
        validationErrors[error.path[0]] = error.message
      });

      throw new UserErrors(validationErrors, 400);
    };

    const {userName, password} = await validationRequest;

    const user = await this.userRepository.findUser({userName});    

    if (!user) {
      throw new UserErrors({error: "Username does not exist."}, 404);
    };

    const decryptPassword = await this.bcryptAdapter.compareHash({
      password,
      passwordDatabase: user.password_hash
    });

    if ( !decryptPassword ) {
      throw new UserErrors({error: "Invalid password."}, 406);
    };

    const generateToken = this.jwtAdapter.generateToken({
      id: user.id_user
    });

    return {
      userName: user.user_name,
      token: generateToken,
    };
  };

  async getUserByToken (token: string) {
    if ( !token ) {
      throw new UserErrors({error: "The token is required."}, 406);
    };

    const decryptJwt = this.jwtAdapter.getTokenData({
      token
    });

    const user = await this.userRepository.findUser({
      idUser: decryptJwt.id
    });

    if (!user) {
      throw new UserErrors({error: "Invalid token."}, 401);
    };

    return user;
  };
};