import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { Config } from './types/Config';
import type { CorrespondentResponse } from './types/Correspondents';
import type { DocumentTypeResponse } from './types/DocumentTypes';
import type { DocumentId } from './types/Generic';
import type { Metadata } from './types/Metadata';
import type { TagResponse } from './types/Tags';

export class Paperless {
  private instance: AxiosInstance;

  constructor(config: Config) {
    const baseURL = config.port ? `${config.host}:${config.port}` : config.host;
    const options: Record<string, unknown> = {
      baseURL: `${baseURL}/api`,
      headers: {
        Accept: 'application/json; version=2',
      },
      auth: {
        username: config.username,
        password: config.password,
      },
    };

    if (config.ignoreSSL) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
      const https = require('https');
      options.httpsAgent = new https.Agent({
        rejectUnauthorized: !config.ignoreSSL,
      });
    }

    this.instance = axios.create(options);
  }

  /**
   * Get a document by Id
   * @param id - Document Id
   */
  public async getDocument(id: DocumentId): Promise<Document> {
    const response = await this.instance.get(`/documents/${id}/`);

    return response.data;
  }

  /**
   * Get a documents file by Id
   * @param id - Document Id
   * @param original - Download original document, even if archived version is available
   */
  public async downloadDocument(id: DocumentId, original = false): Promise<Buffer> {
    const response = await this.instance.get(`/documents/${id}/download/`, {
      responseType: 'arraybuffer',
      params: {
        original,
      },
    });

    return response.data;
  }

  /**
   * Get a documents thumbnail
   * @param id - Document Id
   */
  public async getThumbnail(id: DocumentId): Promise<Buffer> {
    const response = await this.instance.get(`/documents/${id}/thumb/`, {
      responseType: 'arraybuffer',
    });

    return response.data;
  }

  /**
   * Get document metadata
   * @param id - Document Id
   */
  public async getMetadata(id: DocumentId): Promise<Metadata> {
    const response = await this.instance.get(`/documents/${id}/metadata/`);

    return response.data;
  }

  /**
   * Search for documents similar to the document with id
   */
  public async search(moreLike: DocumentId): Promise<Metadata>;

  /**
   * Search for a document using a full text query
   */
  public async search(query: string): Promise<Metadata>;

  public async search(query: string | DocumentId): Promise<Metadata> {
    let searchParams: Record<string, string | DocumentId> = {};

    if (typeof query === 'number') {
      searchParams = {
        more_like: query,
      };
    } else {
      searchParams = {
        query,
      };
    }
    const response = await this.instance.get(`/documents/`, {
      params: searchParams,
    });

    return response.data;
  }

  /**
   * Lists all correspondents
   */
  public async getCorrespondents(): Promise<CorrespondentResponse> {
    const response = await this.instance.get(`/correspondents/`);

    return response.data;
  }

  /**
   * Lists all document types
   */
  public async getDocumentTypes(): Promise<DocumentTypeResponse> {
    const response = await this.instance.get(`/document_types/`);

    return response.data;
  }

  /**
   * Lists all tags
   */
  public async getTags(): Promise<TagResponse> {
    const response = await this.instance.get(`/tags/`);

    return response.data;
  }

  /**
   * Lists all logs
   */
  public async getLogs(): Promise<string[]> {
    const response = await this.instance.get(`/logs/`);

    return response.data;
  }

  /**
   * Lists log lines
   */
  public async getLog(id: string): Promise<string[]> {
    const response = await this.instance.get(`/logs/${id}/`);

    return response.data;
  }
}
