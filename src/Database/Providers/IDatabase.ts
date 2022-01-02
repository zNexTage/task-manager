import { Knex } from "knex";

interface IKnexConfiguration {
    handle(): Knex;
}

export default IKnexConfiguration;
