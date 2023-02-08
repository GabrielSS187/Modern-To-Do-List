export type TUSer = {
  idUser?: number;
  user_name: string;
  password: string;
};

export type TFindUserParams = {
  idUser?: number | string;
  userName?: string;
};

export type TFindUser = {
  id_user: number,
  user_name: string,
  password_hash: string,
};