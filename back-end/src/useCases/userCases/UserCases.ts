import { z } from "zod";

import { IUserRepository } from "../../models/userModel/interfaces";
import { IBCryptAdapter } from "../../adapters/IBcryptAdapter";
import { IJwtAdapter } from "../../adapters/IJwtAdapter";

import { 
  TRegisterRequest,
  registerRequestSchema,
  TSignInRequest,
  signInRequestSchema
} from "./validations";

import { ErrorUser } from "../../errors/UserErrors";

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

      throw new ErrorUser(validationErrors, 400);
    };

    const {userName, password} = await validationRequest;
    
    const user = await this.userRepository.findUser({userName});

    if(user) {
      throw new ErrorUser({error: "A user with that name already exists."}, 409);
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

      throw new ErrorUser(validationErrors, 400);
    };

    const {userName, password} = await validationRequest;

    const user = await this.userRepository.findUser({userName});    

    if (!user) {
      throw new ErrorUser({error: "Username does not exist."}, 404);
    };

    const decryptPassword = await this.bcryptAdapter.compareHash({
      password,
      passwordDatabase: user.password_hash
    });

    if ( !decryptPassword ) {
      throw new ErrorUser({error: "Invalid password."}, 406);
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
      throw new ErrorUser({error: "The token is required."}, 406);
    };

    const decryptJwt = this.jwtAdapter.getTokenData({
      token
    });

    const user = await this.userRepository.findUser({
      idUser: decryptJwt.id
    });

    if (!user) {
      throw new ErrorUser({error: "Invalid token."}, 401);
    };

    return user;
  };
};