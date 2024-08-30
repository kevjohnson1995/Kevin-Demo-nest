import { ApiProperty } from '@nestjs/swagger';
import { OrderRequest } from './OrderRequest';

const Statuses = [
  'Completed',
  'Order accepted - processing',
  'Order accepted - awaiting documentation',
] as const;
type Status = (typeof Statuses)[number];

const SearchResults = ['Clear', 'Not Clear', 'Unable to verify'] as const;
type SearchResult = (typeof SearchResults)[number];

export class OrderResponse {
  @ApiProperty({
    description: 'The current status of the order',
    example: 'Completed',
    enum: Statuses,
    minLength: 1,
  })
  status: Status;

  @ApiProperty({
    description: `The date this order was fulfilled
        \n> **NOTE:** value will be \`null\` if order has not been fulfilled`,
    example: '2022-01-01',
    pattern: '^d{4}-d{2}-d{2}$',
    format: 'date',
    nullable: true,
  })
  completedOn: string;

  @ApiProperty({ description: 'The search input', required: true })
  search: OrderRequest;

  @ApiProperty({
    description: 'The result of the search',
    example: 'Clear',
    enum: SearchResults,
  })
  result: SearchResult;
}
