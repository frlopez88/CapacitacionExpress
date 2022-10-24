const pgp = require('pg-promise')();

const cn = 'postgresql://fernando.lopez:ccolor2021@192.168.20.219:5432/datawarehouse';

const db = pgp(cn);

module.exports = db;