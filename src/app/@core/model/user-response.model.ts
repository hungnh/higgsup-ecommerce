import {UserInfo} from "./user-info.model";

export class UserResponse {
  status: string;
  messageCode: number;
  messageString: string;
  data: UserInfo;
}
