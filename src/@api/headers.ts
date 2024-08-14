import { ApiHeaderOptions } from '@nestjs/swagger';

export const BearerAuthHeaders: ApiHeaderOptions[] = [
  {
    name: 'Authorization',
    required: true,
    description: `Bearer token retrieved from the \`/authenticate\` endpoint sent as \`Bearer <token>\``,
  },
  {
    name: 'Content-Type',
    required: true,
    description: `Must be set to \`application/json\``,
  },
];
