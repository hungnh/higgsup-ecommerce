import {User} from "./user.model";

export class ResponseMessage {
  status: string;
  messageCode: number;
  messageString: string;
  data: User;
}
