import { ApiProperty } from '@nestjs/swagger';

const Statuses = [
  'Completed',
  'Order accepted - processing',
  'Order accepted - awaiting documentation',
] as const;

type Status = (typeof Statuses)[number];

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

  @ApiProperty({
    description: `The DPPA reason for the order
      \n- \`E\` = Employment
      \n- \`I\` = Insurance
      \n- \`R\` = Rental
      \n- \`V\` = Verification`,
    example: 'E',
    enum: ['E', 'I', 'R', 'V'],
  })
  dppa: 'E' | 'I' | 'R' | 'V';
}
