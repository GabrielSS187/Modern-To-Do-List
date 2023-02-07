export interface IBcryptAdapterData {
  password: string;
};

export interface IBcryptCompareAdapterData {
  password: string;
  passwordDatabase: string
};

export interface IBCryptAdapter {
  hashEncrypt: ( data: IBcryptAdapterData ) => Promise<string>;
  compareHash: ( data: IBcryptCompareAdapterData ) => Promise<boolean>;
}; 