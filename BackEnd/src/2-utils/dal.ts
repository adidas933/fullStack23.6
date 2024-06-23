// DAL: data access layer

import mysql2, { PoolOptions, QueryError } from "mysql2";
import { appConfig } from "./app-config";

class Dal {
  // database options
  private options: PoolOptions = {
    host: appConfig.mySqlHost,
    user: appConfig.mySqlUser,
    password: appConfig.mySqlPassword,
    database: appConfig.mySqlDatabase,
  };

  //   connection options to database
  private readonly connection = mysql2.createPool(this.options);

  //   executing query to MySql
  public execute(sql: string, values?: any[]) {
    return new Promise<any>((resolve, reject) => {
      // to promisify
      this.connection.query(sql, values, (err: QueryError, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

export const dal = new Dal();