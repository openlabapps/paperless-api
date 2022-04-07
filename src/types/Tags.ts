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
  name: string;
};

export type TagFilter = {
  /** Name of tag starts with */
  name__istartswith: string;
  /** Name of tag ends with */
  name__iendswith: string;
  /** Name of tag contains */
  name__icontains: string;
  /** Name of tag is exatcly */
  name__iexact: string;
};

export type TagResult = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Tag[];
};

export type TagParsed = TagResult & {
  /** The api wrapper does parse the returned link so we can easily feed it into the function */
  next: number | null;
  previous: number | null;
};

// TODO:
// ordering=
// name - Aufsteigend
// -name - Absteigend
// matching_algorithm - Aufsteigend
// -matching_algorithm - Absteigend
// match - Aufsteigend
// -match - Absteigend
// document_count - Aufsteigend
// -document_count - Absteigend