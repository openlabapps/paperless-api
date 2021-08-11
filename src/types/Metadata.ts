/* eslint-disable camelcase */

type MetadataNotArchived = {
  /** True, if this document is archived, false otherwise */
  has_archive_version: false;
  /** A list of metadata associated with the original document */
  original_metadata: FileMetadata[];
  /** MD5 checksum of the archived document, or null */
  archive_checksum: null;
  /** Size of the archived document in bytes, or null */
  archive_size: null;
  /** Metadata associated with the archived document, or null */
  archive_metadata: null;
};

type MetadataArchived = {
  /** True, if this document is archived, false otherwise */
  has_archive_version: true;
  /** A list of metadata associated with the original document */
  original_metadata: FileMetadata[];
  /** MD5 checksum of the archived document, or null */
  archive_checksum: string;
  /** Size of the archived document in bytes, or null */
  archive_size: number;
  /** Metadata associated with the archived document, or null */
  archive_metadata: FileMetadata[];
};

export type Metadata = {
  /** MD5 checksum of the original document */
  original_checksum: string;
  /** Size of the original document, in bytes */
  original_size: number;
  /** Mime type of the original document */
  original_mime_type: string;
  /** Current filename of the document, under which it is stored inside the media directory */
  media_filename: string;
} & (MetadataArchived | MetadataNotArchived);

export type FileMetadata = {
  namespace: string | null;
  prefix: string | null;
  key: string;
  value: string;
};
