import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderDetailsResponse } from './dto/test';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Order Details',
    description: 'Get the details of an existing order.',
  })
  @ApiBearerAuth('Bearer')
  @ApiResponse({ status: 200, description: 'OK', type: OrderDetailsResponse })
  getHello(): OrderDetailsResponse {
    return this.appService.getHello();
  }
}
