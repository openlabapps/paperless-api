/* eslint-disable camelcase */

import type { CorrespondentId, DocumentId, DocumentTypeId } from './Generic';

export type Document = {
  /** Document Id */
  id: DocumentId;
  /** Document Title */
  title: string;
  /** OCR'd Content */
  content: string | null;
  correspondent: CorrespondentId | null;
  document_type: DocumentTypeId | null;
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
};

export type DocumentListResult = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Document[];
};

export type DocumentListParsed = DocumentListResult & {
  /** The api wrapper does parse the returned link so we can easily feed it into the function */
  next: number | null;
  previous: number | null;
};
