export type TUSer = {
  userName: string;
  password: string;
};

export type TFindUser = {
  id_user: number,
  user_name: string,
  password_hash: string,
};

export type TSignInResponse = {
  userName: string, 
  token: string;
};