import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { parseLinks } from './helpers/ParseLinks';
import type { Config } from './types/Config';
import type { CorrespondentResponse } from './types/Correspondents';
import type { DocumentFilter, DocumentListParsed, DocumentListResult, DocumentOrdering } from './types/Document';
import type { DocumentTypeResponse } from './types/DocumentTypes';
import type { DocumentId, Token } from './types/Generic';
import type { Metadata } from './types/Metadata';
import type { TagFilter, TagParsed, TagResult } from './types/Tags';

export class Paperless {
  private instance: AxiosInstance;

  private isUserAuth = false;

  constructor(config: Config) {
    const baseURL = config.port ? `${config.host}:${config.port}` : config.host;
    const options: AxiosRequestConfig = {
      baseURL: `${baseURL}/api`,
      headers: {
        Accept: 'application/json; version=2',
      },
    };

    if (config.ignoreSSL) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
      const https = require('https');
      options.httpsAgent = new https.Agent({
        rejectUnauthorized: !config.ignoreSSL,
      });
    }

    if (config.username) {
      this.isUserAuth = true;
      options.auth = {
        username: config.username,
        password: config.password,
      };
    }

    if (config.token) {
      this.isUserAuth = false;
      options.headers.Authorization = `Token ${config.token}`;
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
   * List documents. This function replaces the returned next and previous links with simple page numbers which you can feed back into the fn.
   * @param filter - Filter for the result
   * @param ordering - Ordering of the result list
   * @param page - Page to be queried
   */
   public async getDocuments(filter: DocumentFilter, ordering: DocumentOrdering, page = 1): Promise<DocumentListParsed> {
    const response = await this.instance.get<DocumentListResult>(`/documents/?page=${page}`, {
      params: { ...filter, ...ordering },
    });

    return parseLinks<DocumentListParsed>(response.data);
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
   * Lists all or filtered tags
   * @param filter - Filter for the result
   */
   public async getTags(filter: TagFilter): Promise<TagParsed> {
    const response = await this.instance.get<TagResult>(`/tags/`, {
      params: filter,
    });

    return parseLinks<TagParsed>(response.data);
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

  /**
   * Returns a Token for authentication. Can only be used with username & password
   */
  public async getToken(): Promise<{ token: Token }> {
    if (!this.isUserAuth) {
      throw new Error('getToken is only usable if you are logged in via username / password');
    }
    const response = await this.instance.post('/token/', {
      username: this.instance.defaults.auth.username,
      password: this.instance.defaults.auth.password,
    });

    return response.data;
  }
}
