/* eslint-disable camelcase */

import type { MatchingAlgorithms } from './Correspondents';
import type { DocumentTypeId } from './Generic';

export type DocumentType = {
  id: DocumentTypeId;
  slug: string;
  name: string;
  match: string;
  matching_algorithm: MatchingAlgorithms;
  is_insensitive: boolean;
  document_count: number;
};

export type DocumentTypeResponse = DocumentType[];
