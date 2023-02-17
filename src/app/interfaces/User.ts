export interface User {
  _id:string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  dateOfBirth: string;
  address: string;
  pincode: string;
  state: string;
  city: string;
  }

 export enum ObjectType {
    text,
    json,
  }