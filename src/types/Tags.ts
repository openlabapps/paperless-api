/* eslint-disable camelcase */

import type { MatchingAlgorithms } from './Correspondents';
import type { TagId } from './Generic';

export type Tag = {
  id: TagId;
  slug: string;
  color: string;
  text_color: string;
  match: string;
  matching_algorithm: MatchingAlgorithms;
  is_insensitive: boolean;
  is_inbox_tag: boolean;
  document_count: number | null;
};

export type TagResponse = Tag[];
