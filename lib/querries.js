const { query } = require("express");
const { Pool } = require(`pg`)
const Pool = new Pool ({
    user: `dory`,
    host:`localhost`,
    database:`employee-tracker`,
    password:`123123`,
    port:5432
});

module.exports ={ query: (test,params) =>Pool.query (text,params),

};
