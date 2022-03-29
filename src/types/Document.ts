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

export type DocumentFilter = {
  /** Title of document starts with */
  title__istartswith: string;
  /** Title of document ends with */
  title__iendswith: string;
  /** Title of document contains */
  title__icontains: string;
  /** Tilte of document is exactly */
  title__iexact: string;
  /** Title or content of document contains */
  title_content: string;
  /** Content of document starts with */
  content__istartswith: string;
  /** Content of document ends with */
  content__iendswith: string;
  /** Content of document contains */
  content__icontains: string;
  /** Content of document is exactly */
  content__iexact: string;
  /** Archive serial number of document is */
  archive_serial_number: number;
  /** Archive serial number of document is greater than */
  archive_serial_number__gt: number;
  /** Archive serial number of document is greater or equal than */
  archive_serial_number__gte: number;
  /** Archive serial number of document is lower than */
  archive_serial_number__lt: number;
  /** Archive serial number of document is lower or equal than */
  archive_serial_number__lte: number;
  /** Archive serial number of document is null */
  archive_serial_number__isnull: boolean;
  /** Created year of document is */
  created__year: number;
  /** Created month of document is */
  created__month: number;
  /** Created day of month of document is */
  created__day: number;
  /** Created date of document is greater than */
  created__date__gt: string;
  /** Created date of document is greater than */
  created__date__lt: string;
  /** Created is grater than */
  created__gt: string;
  /** Created is lower than */
  created__lt: number;
  /** Added year is */
  added__year: number;
  /** Added month is */
  added__month: number;
  /** Added day of month is */
  added__day: number;
  /** Added date is greater than */
  added__date__gt: string;
  /** Added date is lower than */
  added__date__lt: string;
  /** Added is greater than */
  added__gt: string;
  /** Added is lower than */
  added__lt: string;
  /** Modified year is */
  modified__year: number;
  /** Modified month is */
  modified__month: number;
  /** Modified day of month */
  modified__day: number;
  /** Modified date is greater than */
  modified__date__gt: string;
  /** Modified date is lower than */
  modified__date__lt: string;
  /** Modified is greater than */
  modified__gt: string;
  /** Modified is lower than */
  modified__lt: string;
  /** Correspondent is null */
  correspondent__isnull: boolean;
  /** Correspondent id is */
  correspondent__id: CorrespondentId;
  /** TODO: comma sperated list? arry or string?  Correspondent id is in */
  correspondent__id__in: number[];
  /** Correspondent name starts with */
  correspondent__name__istartswith: string;
  /** Correspondent name ends with */
  correspondent__name__iendswith: string;
  /** Correspondent name contains */
  correspondent__name__icontains: string;
  /** Correspondent name is exactly */
  correspondent__name__iexact: string;
  /** Tags id is */
  tags__id: number;
  /** TODO: comma sperated list? arry or string? Tags id is in */
  tags__id__in: number[];
  /** Tags name starts with */
  tags__name__istartswith: string;
  /** Tags name ends with */
  tags__name__iendswith: string;
  /** Tags name contains */
  tags__name__icontains: string;
  /** Tags name is exactly */
  tags__name__iexact: string;
  /** Document type is null */
  document_type__isnull: boolean;
  /** Document type id is */
  document_type__id: DocumentTypeId;
  /**  TODO: comma sperated list? arry or string? Document type id is in */
  document_type__id__in: DocumentTypeId[];
  /** Document type name start width */
  document_type__name__istartswith: string;
  /** Document type name ends width */
  document_type__name__iendswith: string;
  /** Document type name contains */
  document_type__name__icontains: string;
  /** Document type name is exactly */
  document_type__name__iexact: string;
  /** Document is tagged */
  is_tagged: boolean;
  /** TODO:  */
  tags__id__all: number;
  /** TODO:  */
  tags__id__none: number;
  /** Document is in inbox */
  is_in_inbox: boolean;
};

export enum Ordering {
  ID_ASCENDING = 'id',
  ID_DESCENDING = '-id',
  TITLE_ASCENDING = 'title',
  TITLE_DESENDING = '-title',
  CORRESPONDENT__NAME_ASCENDING = 'correspondent__name',
  CORRESPONDENT__NAME_DESENDING = '-correspondent__name',
  DOCUMENT_TYPE__NAME_ASCENDING = 'document_type__name',
  DOCUMENT_TYPE__NAME_DESENDING = '-document_type__name',
  CREATED_ASCENDING = 'created',
  CREATED_DESENDING = '-created',
  MODIFIED_ASCENDING = 'modified',
  MODIFIED_DESENDING = '-modified',
  ADDED_ASCENDING = 'added',
  ADDED_DESENDING = '-added',
  ARCHIVE_SERIAL_NUMBER_ASCENDING = 'archive_serial_number',
  ARCHIVE_SERIAL_NUMBER_DESENDING = '-archive_serial_number',
}

export type DocumentOrdering = {
  ordering: Ordering;
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
