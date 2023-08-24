export interface IBusResponse {
  success: StatusResponse;
  error: StatusResponse;
  // content: Content;
}

export interface Content {
  data: any[];
}

export interface StatusResponse {
  status: number;
  code: number;
  message: string;
}

export type BusData = {
  transId: string;
  busId: string;
};
