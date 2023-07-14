export interface IAccount {
  _id: string;
  loginId: string;
  loginType: string;
  properties: {
    email: string;
    _id: string;
  };
  favouriteDungeons: string[];
}
