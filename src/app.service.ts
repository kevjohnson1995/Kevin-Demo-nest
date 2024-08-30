import { Injectable } from '@nestjs/common';
import { Order, OrderDetailsResponse } from './dto/test';

@Injectable()
export class AppService {
  getOrderDetails(order: Order): OrderDetailsResponse {
    return {
      result: 'Clear',
      status: 'Completed',
      search: order,
      completedOn: new Date().toISOString(),
    };
  }
}
