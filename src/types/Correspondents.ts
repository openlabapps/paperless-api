/* eslint-disable camelcase */

import type { CorrespondentId } from './Generic';

export enum MatchingAlgorithms {
  /** Any: Document contains any of these words (space separated) */
  ANY = 1,
  /** All: Document contains all of these words (space separated) */
  ALL = 2,
  /** Exact: Document contains this string */
  EXACT = 3,
  /** Regular expression: Document matches this regular expression */
  REGULAR_EXPRESSION = 4,
  /** Fuzzy: Document contains a word similar to this word */
  FUZZY = 5,
  /** Auto: Learn matching automatically */
  AUTO = 6,
}

export type Correspondent = {
  id: CorrespondentId;
  slug: string;
  name: string;
  match: string;
  matching_algorithm: MatchingAlgorithms;
  is_insensitive: boolean;
  document_count: number;
  last_correspondence: string | null;
};

export type CorrespondentResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Correspondent[];
};
