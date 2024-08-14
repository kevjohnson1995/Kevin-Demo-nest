import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderDetailsResponse } from './dto/test';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DefaultBearerAuth, DefaultErrorResponses } from './@api/defaults';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @DefaultBearerAuth()
  @DefaultErrorResponses()
  @ApiOperation({
    summary: 'Order Details',
    description: 'Get the details of an existing order.',
    operationId: 'get-order-details',
  })
  @ApiResponse({ status: 200, description: 'OK', type: OrderDetailsResponse })
  getOrderDetails(): OrderDetailsResponse {
    return this.appService.getOrderDetails();
  }
}
