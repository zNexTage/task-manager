import knex, { Knex } from "knex";
import DbType from "../DbType";
import IKnexConfiguration from "../Providers/IDatabase";
const config = require('../../../knexfile');

class KnexConfiguration implements IKnexConfiguration {
    handle(): Knex<any, unknown[]> {
        const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

        return knex(config[env]);
    }

}

export default KnexConfiguration