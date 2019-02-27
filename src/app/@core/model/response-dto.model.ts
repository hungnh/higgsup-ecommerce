export class ResponseDTO {
  pageIndex: number;
  pageSize: number;
  responseMessage: {
    data: any,
    messageCode: string;
    messageString: string;
    status: string;
  };
  totalItem: number;
  totalPage: number;
}
