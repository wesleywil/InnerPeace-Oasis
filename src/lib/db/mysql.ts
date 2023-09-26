import mysql, { type Connection } from "mysql2/promise";
import {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_PASSWORD,
  MYSQL_USERNAME,
} from "$env/static/private";

interface MysqlConnectionOptions {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

let mysqlconn: Promise<Connection> | null = null;

export async function mysqlconnFn(): Promise<Connection> {
  if (!mysqlconn) {
    const options: MysqlConnectionOptions = {
      host: MYSQL_HOST,
      port: parseInt(MYSQL_PORT),
      user: MYSQL_USERNAME,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
    };
    mysqlconn = mysql.createConnection(options);
  }

  return await mysqlconn;
}
