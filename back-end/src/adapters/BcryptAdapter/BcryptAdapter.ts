import * as bcrypt from "bcryptjs";
import { env } from "process";

import { 
  IBCryptAdapter, 
  IBcryptAdapterData, 
  IBcryptCompareAdapterData 
} from "../IBcryptAdapter";

export class BCryptAdapter implements IBCryptAdapter {
  async hashEncrypt ( { password }: IBcryptAdapterData ) {
    const rounds = Number(env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(rounds);
    const result = await bcrypt.hash(password, salt);
    return result;
  };

  async compareHash ( { password,  passwordDatabase }: 
    IBcryptCompareAdapterData ) {
    const result = await bcrypt.compare(password, passwordDatabase);
    return result;
  };
}; 