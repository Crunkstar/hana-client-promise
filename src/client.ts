import { Connection, ConnectionOptions, createConnection } from '@ibsolution/types-hana-client';
import { Statement } from './statement';

interface Options extends ConnectionOptions {
  currentSchema?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Param = any;
type Params = Param | Param[];

export class HanaClient {
  private static ERROR_MSG = 'create hana client connection first';

  private options: Options;

  private connection: Connection;

  public constructor(options: ConnectionOptions) {
    this.options = options;
    this.options.currentSchema = options.schema ? `"${options.schema}"` : undefined;
  }

  public async createConnection(): Promise<HanaClient> {
    return new Promise((resolve, reject): void => {
      const connection = createConnection();
      this.connection = undefined;
      connection.connect(this.options, (err): void => {
        if (err) {
          reject(err);
          return;
        }
        this.connection = connection;
        if (this.options.autoCommit === true || this.options.autoCommit === false) {
          this.setAutoCommit(this.options.autoCommit);
        }
        resolve(this);
      });
    });
  }

  public async disconnect(): Promise<HanaClient> {
    if (!this.connection) {
      throw new Error(HanaClient.ERROR_MSG);
    }
    return new Promise((resolve, reject): void => {
      this.connection.disconnect((err): void => {
        if (err) {
          reject(err);
          return;
        }
        this.connection = undefined;
        resolve(this);
      });
    });
  }

  public async exec<T>(sql: string, params?: Params): Promise<T> {
    if (!this.connection) {
      throw new Error(HanaClient.ERROR_MSG);
    }
    return new Promise((resolve, reject): void => {
      this.connection.exec<T>(sql, params, (err, results): void => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }

  public async prepare(sql: string): Promise<Statement> {
    if (!this.connection) {
      throw new Error(HanaClient.ERROR_MSG);
    }
    return new Promise((resolve, reject): void => {
      this.connection.prepare(sql, (err, stmt): void => {
        if (err) {
          reject(err);
          return;
        }
        const statement = new Statement(stmt);
        resolve(statement);
      });
    });
  }

  public setAutoCommit(autoCommit: boolean = false): void {
    if (!this.connection) {
      throw new Error(HanaClient.ERROR_MSG);
    }
    this.connection.setAutoCommit(autoCommit);
  }

  public async commit(): Promise<void> {
    if (!this.connection) {
      throw new Error(HanaClient.ERROR_MSG);
    }
    return new Promise((resolve, reject): void => {
      this.connection.commit((err): void => (err ? reject(err) : resolve()));
    });
  }

  public async rollback(): Promise<void> {
    if (!this.connection) {
      throw new Error(HanaClient.ERROR_MSG);
    }
    return new Promise((resolve, reject): void => {
      this.connection.rollback((err): void => (err ? reject(err) : resolve()));
    });
  }
}
