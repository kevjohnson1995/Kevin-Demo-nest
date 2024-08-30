import { Injectable } from '@nestjs/common';
import { OrderResponse } from './dto/OrderResponse';
import { OrderRequest } from './dto/OrderRequest';

@Injectable()
export class AppService {
  getOrderDetails(order: OrderRequest): OrderResponse {
    return {
      result: 'Clear',
      status: 'Completed',
      search: order,
      completedOn: new Date().toISOString(),
    };
  }
}
