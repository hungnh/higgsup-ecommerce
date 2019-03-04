import {Role} from "./role.model";

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  createdDate: number;
  updatedDate: number;
  version: string;
}
