import {UserResponse} from "./user-response.model";

export class ResponseMessageProfile {
  responseMessage: UserResponse;
  totalItem: number;
  pageIndex: number;
  pageSize: number;
  totalPage: number;
}
