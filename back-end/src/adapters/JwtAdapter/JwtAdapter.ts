import { env } from "process";
import * as jwt from "jsonwebtoken";

import { 
  IJwtAdapter,  
  IJwtAuthenticationData, 
  IJwtGetTokenData 
} from "../IJwtAdapter";

export class JwtAdapter implements IJwtAdapter {
  generateToken ( {  id  }: IJwtAuthenticationData ) {
    const expiresIn = "1d";
    const token = jwt.sign(
      {
        id,
      },
        env.JWT_KEY as string,
     {
        expiresIn
     }
    );
    return token;
  };

  getTokenData ({ token }: IJwtGetTokenData) {
    const payload = jwt.verify(token, env.JWT_KEY as string) as IJwtAuthenticationData;
    const result = {
      id: payload.id,
    };
    return result;
  };
};