import {ResponseMessage} from "./response-message.model";

export class RegisterDTO {
  responseMessage: ResponseMessage;
  totalItem: number;
  pageIndex: number;
  pageSize: number;
  totalPage: number;
}
