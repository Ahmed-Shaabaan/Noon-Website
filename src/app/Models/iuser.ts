export interface IUser {
  userId: string;
  success: boolean;
  expiration: Date;
  username: string;
  email: string;
  mobileNumber: string;
  token: string;
  roles: string[];
  FirstName:string;
  LastName:string;
  address: {
    city: string;
    country: string;
  };
}
