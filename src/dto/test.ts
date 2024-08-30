import { ApiProperty } from '@nestjs/swagger';

const Statuses = [
  'Completed',
  'Order accepted - processing',
  'Order accepted - awaiting documentation',
] as const;
type Status = (typeof Statuses)[number];

const SearchTypes = ['CR', 'SO', 'TN', 'MV'] as const;
type SearchType = (typeof SearchTypes)[number];

const SearchResults = ['Clear', 'Not Clear', 'Unable to verify'] as const;
type SearchResult = (typeof SearchResults)[number];

export class Order {
  @ApiProperty({
    description: 'Unique ID to reference this order with',
    example: 'ABC-123',
    minLength: 1,
    required: true,
  })
  referenceId: string;

  @ApiProperty({
    description: 'The first name to search on',
    example: 'John',
    pattern: `^[A-Za-z0-9'-]{1,30}$`,
    minLength: 1,
    nullable: false,
    required: true,
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name to search on',
    example: 'Smith',
    pattern: `^[A-Za-z0-9'-]{1,30}$`,
    minLength: 1,
    nullable: false,
    required: true,
  })
  lastName: string;

  @ApiProperty({
    description: `The search type to perform
      \n- \`CR\` = Criminal
      \n- \`SO\` = Sex Offender
      \n- \`MV\` = Motor Vehicle
      \n- \`TN\` = Tenant`,
    example: 'CR',
    enum: SearchTypes,
  })
  searchType: SearchType;
}

export class OrderDetailsResponse {
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
  search: Order;

  @ApiProperty({
    description: 'The result of the search',
    example: 'Clear',
    enum: SearchResults,
  })
  result: SearchResult;
}
