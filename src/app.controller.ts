import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Order, OrderDetailsResponse } from './dto/test';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DefaultBearerAuth, DefaultErrorResponses } from './@api/defaults';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private orders: Record<string, OrderDetailsResponse> = {};

  @Get('order/:id')
  @DefaultBearerAuth()
  @DefaultErrorResponses()
  @ApiOperation({
    summary: 'Order Details',
    description: 'Get the details of an existing order.',
    operationId: 'get-order-details',
  })
  @ApiResponse({ status: 200, description: 'OK', type: OrderDetailsResponse })
  getOrderDetails(
    @Param('id') id: string,
  ): OrderDetailsResponse | { message: string } {
    return this.orders[id.toLowerCase()] ?? { message: 'Order not found' };
  }

  @Post('order')
  @DefaultBearerAuth()
  @DefaultErrorResponses()
  @ApiOperation({
    summary: 'Place Order',
    description: 'Place a new order.',
    operationId: 'place-order',
  })
  @ApiBody({
    type: Order,
    required: true,
    description: 'The order request body',
  })
  @ApiResponse({ status: 200, description: 'OK', type: OrderDetailsResponse })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  postOrder(@Body() order: Order): OrderDetailsResponse | { message: string } {
    order.referenceId = order.referenceId.toLowerCase();

    if (this.orders[order.referenceId]) {
      return { message: 'Reference ID must be unique' };
    }
    this.orders[order.referenceId] = this.appService.getOrderDetails(order);
    return this.orders[order.referenceId];
  }
}
