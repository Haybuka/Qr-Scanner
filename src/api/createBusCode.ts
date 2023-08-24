import axios from 'axios';
import { BusData, IBusResponse } from '.';

export const _createBusCode = async (data: BusData): Promise<IBusResponse> => {
  try {
    const response = await axios.post(
      'https://tap-s2p.touchandpay.me/api/app/v1/buses/payment',
      { data }
    );

    return await response.data;
  } catch (error: any) {
    if (error?.response?.status === 400) {
      return error.response.data;
    } else {
      return {
        success: {
          status: 400,
          code: 1,
          message: 'string',
        },
        error: {
          status: 400,
          code: 1,
          message: 'Network Error',
        },
      };
    }
  }
};
