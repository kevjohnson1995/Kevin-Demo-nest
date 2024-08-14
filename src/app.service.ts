import { Injectable } from '@nestjs/common';
import { OrderDetailsResponse } from './dto/test';

@Injectable()
export class AppService {
  getOrderDetails(): OrderDetailsResponse {
    return {
      dppa: 'E',
      status: 'Completed',
      completedOn: new Date().toISOString(),
    };
  }
}
