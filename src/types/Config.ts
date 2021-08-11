export type Config = {
  /** Protocol and Address of your Paperless Instance */
  host: string;
  /** Port of your Paperless Instance */
  port?: number | string;
  /** Username you use to login to the Dashboard */
  username: string;
  /** Password you use to login to the Dashboard */
  password: string;
  /** Ignore SSL Errors */
  ignoreSSL?: boolean;
};
