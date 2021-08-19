/* eslint-disable camelcase */

import type { DocumentId } from './Generic';

export type SearchResponse = {
  /** Count of results */
  count: number;
  /** Link to next page */
  next: string | null;
  /** Link to previous page */
  previous: string | null;
  /** Current filename of the document, under which it is stored inside the media directory */
  media_filename: string;
  /** Search Results */
  results: SearchResult[];
};

export type SearchResult = {
  /** Document Id */
  id: DocumentId;
  /** Document Title */
  title: string;
  /** OCR'd Content */
  content: string | null;
  /** Document Tags */
  tags: string[];
  /** ISO-8601 formatted creation date */
  created: string;
  /** ISO-8601 formatted modification date */
  modified: string;
  /** ISO-8601 formatted added date */
  added: string;
  /** UNKNOWN */
  archive_serial_number: unknown;
  /** Filename before Import */
  original_file_name: string;
  /** Filename after archiving */
  archived_file_name: string | null;
  /** Information about the search results */
  __search_hit__: SearchHit;
};

export type SearchHit = {
  /** Indication how well this document matches the query relative to the other search results */
  score: number;
  /** Excerpt from the document content and highlights the search terms with <span> tags */
  highlights: string;
  /** Index of the search results. The first result will have rank 0. */
  rank: number;
};
