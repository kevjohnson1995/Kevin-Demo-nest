import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DefaultBearerAuth, DefaultErrorResponses } from './@api/defaults';
import { OrderResponse } from './dto/OrderResponse';
import { OrderRequest } from './dto/OrderRequest';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private orders: Record<string, OrderResponse> = {};

  @Get('order/:id')
  @ApiTags('Order Search')
  @DefaultBearerAuth()
  @DefaultErrorResponses()
  @ApiParam({
    name: 'id',
    description: 'The unique identifier for the order',
    example: 'ABC-123',
    required: true,
    type: String,
  })
  @ApiOperation({
    summary: 'Order Details',
    description: 'Get the details of an existing order.',
    operationId: 'get-order-details',
  })
  @ApiResponse({ status: 200, description: 'OK', type: OrderResponse })
  getOrder(@Param('id') id: string): OrderResponse | { message: string } {
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
    type: OrderRequest,
    required: true,
    description: 'The order request body',
  })
  @ApiResponse({ status: 200, description: 'OK', type: OrderResponse })
  @ApiTags('Order Search')
  postOrder(@Body() order: OrderRequest): OrderResponse | { message: string } {
    order.referenceId = order.referenceId.toLowerCase();

    if (this.orders[order.referenceId]) {
      return { message: 'Reference ID must be unique' };
    }
    this.orders[order.referenceId] = this.appService.getOrderDetails(order);
    return this.orders[order.referenceId];
  }
}
