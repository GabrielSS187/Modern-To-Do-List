export interface IJwtAuthenticationData {
  id: string | number;
};

export interface IJwtGetTokenData {
  token: string;
};

export interface IJwtAdapter{
  generateToken: ( data: IJwtAuthenticationData ) => string;
  getTokenData: ( data: IJwtGetTokenData ) => IJwtAuthenticationData; 
};