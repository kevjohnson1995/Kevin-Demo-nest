import { ApiProperty } from '@nestjs/swagger';

const SearchTypes = ['CR', 'SO', 'TN', 'MV'] as const;
type SearchType = (typeof SearchTypes)[number];
export class OrderRequest {
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
