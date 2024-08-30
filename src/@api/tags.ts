import { ExternalDocumentationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { useMarkdown } from 'src/util/useMarkdown';

type Tag = {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
};

export const Tags: Record<string, Tag> = {
  ORDER_SEARCH: {
    name: 'Order Search',
    description: useMarkdown('Tag_OrderSearch.md'),
  },
};
