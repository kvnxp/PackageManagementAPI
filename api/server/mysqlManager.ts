import * as mysql from 'mysql2';
import { enviromentKeys } from './enviromentKeys';
import * as fs from "node:fs";
import { printError } from './sentryReport';

export let SQL: mysql.PoolConnection;
export class MysqlManager {

    static sqlPoolConnection: mysql.PoolConnection;

    public static async initPoolConnection() {

        const connectionStatus = new Promise((resolve, reject) => {

            const pool = mysql.createPool({
                connectionLimit: 10,
                host: enviromentKeys.DATABASEURL,
                user: enviromentKeys.DATABASEUSER,
                password: enviromentKeys.DATABASEPASSWORD,
            })

            pool.getConnection(async (err, connection) => {
                this.sqlPoolConnection = connection;

                if (err) {
                    printError(err);
                    reject(err);
                }

                const res: any = await connection.promise().query("SHOW DATABASES")
                const found = res[0].find((element: any) => {
                    return element.Database === enviromentKeys.DATABASENAME;
                })

                if (!found) {
                    console.log('Database not found');
                    await this.databaseInitialization();
                }

                await connection.promise().query("USE " + enviromentKeys.DATABASENAME);
                console.log('Connected to database');
                SQL = this.sqlPoolConnection;
                resolve(connection);
            })
        })
        return connectionStatus;
    }

    static async createTable(query: string) {

        try {
            const res = await this.sqlPoolConnection.promise().query(query)
            console.log('Table created', res);

        } catch (error) {
            console.log('Error creating table', error);
        }
    }

    static async databaseInitialization() {
        console.log('Creating database');
        try {

            const res = await this.sqlPoolConnection.promise().execute("CREATE DATABASE IF NOT EXISTS packageManager");
            await this.sqlPoolConnection.promise().query("USE " + enviromentKeys.DATABASENAME);

            const projectDir = process.cwd();
            const sql = fs.readFileSync(projectDir + "/sqlTemplate.sql", "utf-8");

            const sqlCommands = sql.split(';').map(cmd => cmd.trim()).filter(cmd => cmd.length > 0);

            for (const cmd of sqlCommands) {
                await this.sqlPoolConnection.promise().query(cmd);
            }

            console.log('Database created', res);
        } catch (error) {
            console.log('Error creating database', error);
        } finally {
            this.sqlPoolConnection.release();
        }
    }
}


